import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'
import { toast } from '@zerodevx/svelte-toast'

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
	htmlOrGraphNodeID: string,
	typenode: boolean | unknown
) {
	let ok = null
	if (typenode === false) {
		content.innerHTML = htmlOrGraphNodeID
	} else if (typenode === true) {
		content.appendChild(
			this.noderegister[htmlOrGraphNodeID].html.cloneNode(true)
		)
	} else {
		// SVELTE CODE | new SvelteComponent(props:{target})
		try {
			ok = new this.noderegister[htmlOrGraphNodeID].html({
				target: content,
			})
		} catch (error) {
			toast.push(
				`The previous Node won't load. Internal Drawflow Error.`,
				{ pausable: true }
			)
			ok = false
		}
		// SVELTE CODE
	}
	return { ok: ok }
}

export function injectNodeCycle(
	this: Drawflow,
	parent: HTMLElement,
	json: DrawflowNode
) {
	this.precanvas.appendChild(parent)
	this.drawflow.drawflow[this.module].data[json.id] = json
	this.dispatch('nodeCreated', json.id)
	if (!this.useuuid) {
		this.nodeId++
	}
	return json.id
}
