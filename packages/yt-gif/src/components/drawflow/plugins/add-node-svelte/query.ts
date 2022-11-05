import type Drawflow from 'drawflow'

export function getUUID(this: Drawflow): number {
	if (this.useuuid) {
		var newNodeId = this.getUuid()
	} else {
		var newNodeId = this.nodeId
	}
	// @ts-ignore
	return newNodeId as number
}

export function AssertContentElement(
	this: Drawflow,
	content: HTMLElement,
	html: string,
	typenode: boolean | unknown
) {
	if (typenode === false) {
		content.innerHTML = html
	} else if (typenode === true) {
		content.appendChild(this.noderegister[html].html.cloneNode(true))
	} else {
		// SVELTE CODE
		const wrapper = new this.noderegister[html].html({
			target: content,
		})
		// SVELTE CODE
	}
}

export function injectNodeCycle(
	this: Drawflow,
	parent: HTMLElement,
	json: addNodeJson
) {
	this.precanvas.appendChild(parent)
	this.drawflow.drawflow[this.module].data[json.id] = json
	this.dispatch('nodeCreated', json.id)
	if (!this.useuuid) {
		this.nodeId++
	}
	return json.id
}

interface addNodeJson {
	name: string
	data: any
	html: string
	typenode: string | boolean
	id: number
	class: string
	inputs: any
	outputs: any
	pos_x: number
	pos_y: number
}