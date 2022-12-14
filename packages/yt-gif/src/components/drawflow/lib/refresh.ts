import type { EventNames } from '../src/drawflow/events'
import type { DrawflowStore } from '../cmp/store'
import { get } from 'svelte/store'
export function listenAndRefreshEditor(
	ctx: typeof DrawflowStore,
	callback: () => any
) {
	// stupid svelte magic!
	const editor = () => get(ctx).editor
	const events: EventNames[] = [
		'nodeCreated',
		'nodeRemoved',
		'nodeMoved',
		'connectionCreated',
		'connectionRemoved',
		'addReroute',
		'removeReroute',
		'moduleCreated',
		'moduleChanged',
		'moduleRemoved',
		'import',
		'export',
	]
	events.forEach((e: any) => editor().on(e, callback))
}
