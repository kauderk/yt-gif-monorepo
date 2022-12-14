import type { ID } from '$cmp/drawflow/src/drawflow/types'
import { createWritableStore } from '$lib/local-storage-store'
import { crossfade, scale } from 'svelte/transition'
const [send, receive] = crossfade({
	duration: 250,
	// @ts-ignore
	fallback: scale,
})

type Falsy<T> = undefined | null | T

export const initial = {
	/**
	 * From a graph node, start flying towards a Modal layout
	 * From a modal, set to null to come back
	 */
	id: '' as Falsy<ID>,
	/**
	 * Store the "transition:key" to receive from the "modal" and send from "node"
	 */
	prev: '' as Falsy<ID>,
	/**
	 * Store a "uid" to recreate on the "modal"
	 */
	GraphNodeID: '' as Falsy<ID>,
	/**
	 * If you are on the "node" just send to the "modal"
	 * If you are on the "modal" wait on:outroend to change back to "idle"
	 */
	state: <'idle' | 'modal'>'idle',
}
export const nodeTransition = createWritableStore('node-transition', initial)
export { send, receive }
