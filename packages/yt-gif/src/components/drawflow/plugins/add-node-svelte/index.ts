import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { getUUID, injectNodeCycle } from './query'
import type Drawflow from '$cmp/drawflow/src/drawflow'
import type {
	AddNodeProps,
	DrawflowNode,
	DrawflowNodeObject,
} from '$cmp/drawflow/src/drawflow/types'
import { Task } from '$cmp/drawflow/lib/task'
import { DrawflowStore } from '$cmp/drawflow/cmp/store'
import { get } from 'svelte/store'

export type Actions = { onUpdate: (htmlContent: s) => void }
const CreateActions = (baseNode: DrawflowNodeObject) => {
	return <Actions>{
		onUpdate(htmlContent: s) {
			const store = get(DrawflowStore)
			const node = store.editor.getNodeReferenceFromId(baseNode.id)
			if (node) {
				// crazy how svelte maintains the reference to the same object!
				node.data.content = htmlContent
				//store.editor.dispatch('nodeUpdatedData', node)
			}
		},
	}
}
/**
 * It seems to work after "editor.start()", the registration and the method itself.
 * Don't forget to register and add nodes using the same name/html.
 * @param this DrawflowContext
 * @param root #drawflow element
 * @param flush Svelte Components' destroy() method
 * @returns An overridden addNode function, bound to "this".
 */
export function createAddNode(this: Drawflow) {
	async function addNode(this: Drawflow, dataNode: AddNodeProps) {
		const task = Task()
		const id = getUUID.bind(this)()

		const node = { ...dataNode, id }
		const nodeComp = new Node({
			target: this.container,
			props: {
				actions: CreateActions(node),
				node,
				task,
				content: dataNode.data.content,
			},
		})
		await task.promise

		const jsonNode = {
			...dataNode,
			id,
			inputs: nodeComp.out?.inputs as any,
			outputs: nodeComp.out?.outputs as any,
		}

		return injectNodeCycle.bind(this)(
			nodeComp.drawflowParentNode!,
			jsonNode
		)
	}

	async function addNodeImport(
		this: Drawflow,
		dataNode: DrawflowNode,
		precanvas: HTMLElement
	) {
		const task = Task()

		const node = new Node({
			target: precanvas,

			props: {
				actions: CreateActions(dataNode),
				node: {
					...dataNode,
					inputs: Object.keys(dataNode.inputs).length,
					outputs: Object.keys(dataNode.outputs).length,
				},
				task,
				dataNode: { ...dataNode, precanvas },
			},
		})
		await task.promise

		// @ts-ignore
		addInputs(dataNode.data, node.out.drawflowContentNode!)
	}
	return { addNode, addNodeImport }
}
export type DataNode = Pick<DrawflowNode, 'inputs' | 'outputs' | 'id'> & {
	precanvas: HTMLElement
}
