import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { AssertContentElement, getUUID, injectNodeCycle } from './query'
import type Drawflow from '$cmp/drawflow/src/drawflow'
import type {
	AddNodeProps,
	DrawflowNode,
} from '$cmp/drawflow/src/drawflow/types'
import { Task } from '$cmp/drawflow/lib/task'

export type Actions = { onUpdate: (html: s) => void }
let actions: Actions = {
	onUpdate(html: s) {},
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
