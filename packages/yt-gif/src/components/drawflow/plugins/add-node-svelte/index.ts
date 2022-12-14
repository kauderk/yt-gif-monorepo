import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { AssertContentElement, getUUID, injectNodeCycle } from './query'
import type Drawflow from '$cmp/drawflow/src/drawflow'
import type {
	AddNodeProps,
	DrawflowNode,
} from '$cmp/drawflow/src/drawflow/types'

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
export function createAddNode(this: Drawflow, actions: Actions) {
	function addNode(this: Drawflow, params: AddNodeProps) {
		const id = getUUID.bind(this)()

		const node = new Node({
			target: this.container,
			props: {
				actions,
				// @ts-expect-error the types say this is an Element?
				GraphNodeID: params.node.html,
				GraphNodeProps: params.data.props ?? {},

				id,
				className: params.class,

				left: params.pos_x,
				top: params.pos_y,

				inputs: {
					length: params.inputs,
					json: {},
					type: 'input',
				},
				outputs: {
					length: params.outputs,
					json: {},
					type: 'output',
				},
				content: params.data.content,

				drawflowContentNode: <HTMLElement>{},
				drawflowParentNode: <HTMLElement>{},
			},
		})
		// flush.push(() => node.$destroy)

		const jsonNode = {
			...params,
			id,
			inputs: node.inputs.json as any,
			outputs: node.outputs.json as any,
		}

		return injectNodeCycle.bind(this)(node.drawflowParentNode, jsonNode)
	}
	// TODO: unify API parameters
	async function addNodeImport(
		this: Drawflow,
		dataNode: DrawflowNode,
		precanvas: any
	) {
		let task = Task()

		const node = new Node({
			target: precanvas,

			props: {
				actions,
				// @ts-expect-error the types say this is an Element?
				GraphNodeID: dataNode.html,
				id: dataNode.id,

				className: dataNode.class,
				top: dataNode.pos_y,
				left: dataNode.pos_x,
				inputs: {
					length: Object.keys(dataNode.inputs).length,
					json: {},
					type: 'input',
				},
				outputs: {
					length: Object.keys(dataNode.outputs).length,
					offset: 0, // man...
					json: {},
					type: 'output',
				},

				// drawflowContentNode: <HTMLElement>{},
				// drawflowParentNode: <HTMLElement>{},
				dataNode: { ...dataNode, precanvas, task },
			},
		})
		await task.promise
		// flush.push(() => node.$destroy)

		addInputs(dataNode.data, node.drawflowContentNode)
	}
	return { addNode, addNodeImport }
}
function Task<T>() {
	let resolve = (v: T) => {},
		reject = () => {}

	const promise = new Promise<T>(function (_resolve, _reject) {
		resolve = _resolve
		reject = _reject
	})
	return { resolve, reject, promise }
}
