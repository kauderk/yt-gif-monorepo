import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { AssertContentElement, getUUID, injectNodeCycle } from './query'
import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/method-types'
import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'

/**
 * It seems to work after "editor.start()", the registration and the method itself.
 * Don't forget to register and add nodes using the same name/html.
 * @param this DrawflowContext
 * @param root #drawflow element
 * @param flush Svelte Components' destroy() method
 * @returns An overridden addNode function, bound to "this".
 */
export function createAddNode(this: Drawflow, flush: (() => void)[]) {
	function addNode(this: Drawflow, params: AddNodeProps) {
		const newId = getUUID.bind(this)()

		const node = new Node({
			target: this.container,
			props: {
				GraphNodeID: params.node.html,
				GraphNodeProps: params.node.props ?? {},

				id: newId,
				className: params.node.classoverride,

				left: params.cords.x,
				top: params.cords.y,

				inputs: {
					length: params.connections.inputs,
					json: {},
					type: 'input',
				},
				outputs: {
					length: params.connections.outputs,
					json: {},
					type: 'output',
				},

				content: <HTMLElement>{},
				parent: <HTMLElement>{},
			},
		})
		// flush.push(() => node.$destroy)

		const json = {
			name: params.name,
			data: params.data,
			html: params.node.html,
			typenode: params.node.typenode,

			id: newId,
			class: params.node.classoverride,
			inputs: node.inputs.json,
			outputs: node.outputs.json,
			pos_x: params.cords.x,
			pos_y: params.cords.y,
		}

		return injectNodeCycle.bind(this)(node.parent, json)
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
				content: <HTMLElement>{},
				parent: <HTMLElement>{},
				dataNode: { ...dataNode, precanvas, task },
			},
		})
		await task.promise
		// flush.push(() => node.$destroy)

		AssertContentElement.bind(this)(
			node.content,
			dataNode.html,
			dataNode.typenode
		)

		addInputs(dataNode.data, node.content)
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
