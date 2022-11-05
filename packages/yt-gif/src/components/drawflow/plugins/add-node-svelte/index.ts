import Node from './Node.svelte'
import { addInputs } from './add-inputs'
import { AssertContentElement, getUUID, injectNodeCycle } from './query'
import type Drawflow from 'drawflow'

/**
 * It seems to work after "editor.start()", the registration and the method itself.
 * Don't forget to register and add nodes using the same name/html.
 * @param this DrawflowContext
 * @param root #drawflow element
 * @param flush Svelte Components' destroy() method
 * @returns An overridden addNode function, bound to "this".
 */
export function createAddNode(this: Drawflow, flush: (() => void)[]) {
	return function addNode(
		name: string,
		inputs: number,
		outputs: number,
		posx: number,
		posy: number,
		className: string,
		data: any,
		html: string,
		typenode: boolean | string = false
	) {
		const newId = getUUID.bind(this)()

		const node = new Node({
			target: this.container,
			props: {
				id: newId,
				className,
				top: posy,
				left: posx,
				inputs: { length: inputs, json: {}, type: 'input' },
				outputs: { length: outputs, json: {}, type: 'output' },
				content: <HTMLElement>{},
				parent: <HTMLElement>{},
			},
		})
		flush.push(() => node.$destroy)

		AssertContentElement.bind(this)(node.content, html, typenode)

		addInputs(data, node.content)

		const json = {
			name,
			data,
			html,
			typenode,

			id: newId,
			class: className,
			inputs: node.inputs.json,
			outputs: node.outputs.json,
			pos_x: posx,
			pos_y: posy,
		}

		return injectNodeCycle.bind(this)(node.parent, json)
	}
}
