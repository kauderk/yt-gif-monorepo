import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { AssertContentElement, getUUID, injectNodeCycle } from './query'
import type Drawflow from '$cmp/drawflow/src/drawflow'

/**
 * It seems to work after "editor.start()", the registration and the method itself.
 * Don't forget to register and add nodes using the same name/html.
 * @param this DrawflowContext
 * @param root #drawflow element
 * @param flush Svelte Components' destroy() method
 * @returns An overridden addNode function, bound to "this".
 */
export function createAddNode(this: Drawflow, flush: (() => void)[]) {
	function addNode(
		name: string,
		inputs: number,
		outputs: number,
		pos_x: number,
		pos_y: number,
		className: string,
		data: any,
		htmlOrGraphNodeID: string,
		typenode: boolean | string = false
	) {
		const newId = getUUID.bind(this)()

		debugger
		const SvelteComponentSlot = this.noderegister[htmlOrGraphNodeID]?.html
		const node = new Node({
			target: this.container,
			props: {
				SvelteComponentSlot,
				GraphNodeID: htmlOrGraphNodeID,
				id: newId,
				className,
				top: pos_y,
				left: pos_x,
				inputs: { length: inputs, json: {}, type: 'input' },
				outputs: { length: outputs, json: {}, type: 'output' },
				content: <HTMLElement>{},
				parent: <HTMLElement>{},
			},
		})
		// flush.push(() => node.$destroy)

		const json = {
			name,
			data,
			html: htmlOrGraphNodeID,
			typenode,

			id: newId,
			class: className,
			inputs: node.inputs.json,
			outputs: node.outputs.json,
			pos_x: pos_x,
			pos_y: pos_y,
		}

		return injectNodeCycle.bind(this)(node.parent, json)
	}
	// TODO: unify API parameters
	async function addNodeImport(dataNode: any, precanvas: any) {
		let task = Task()

		const node = new Node({
			target: precanvas,
			props: {
				id: dataNode.id,
				className: dataNode.class,
				top: dataNode.pos_y,
				left: dataNode.pos_x,
				inputs: { length: dataNode.inputs, json: {}, type: 'input' },
				outputs: {
					length: Object.keys(dataNode.outputs).length,
					offset: 1, // man...
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
