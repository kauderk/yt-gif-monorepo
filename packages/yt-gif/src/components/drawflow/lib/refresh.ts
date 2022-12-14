import type { EventNames } from '../src/drawflow/events'
import type { DrawflowStore } from '../cmp/store'
import { get } from 'svelte/store'
export function listenAndRefreshEditor(
	ctx: typeof DrawflowStore,
	refreshModules: () => any
) {
	// stupid svelte magic!
	const editor = () => get(ctx).editor
	const events: EventNames[] = [
		'moduleCreated',
		'moduleChanged',
		'moduleRemoved',
		'nodeRemoved',
	]
	events.forEach((e: any) => editor().on(e, refreshModules))
}
