import type Drawflow from 'drawflow'
import type createDragDrop from '../plugins/drag-drop'
import type multiDrag from '../plugins/multi-drag'

import { writable } from 'svelte/store'
import { getContext as svelteContext } from 'svelte'

export const DrawflowStore = writable({
	editor: <Drawflow & { precanvas: HTMLElement }>{},
	dnd: <ReturnType<typeof createDragDrop>>{},
	mul: <ReturnType<typeof multiDrag>>{},
	drawflowRoot: <HTMLElement>{},
	templateDragableRoot: <HTMLElement>{},
	minimap: <HTMLElement>{},
})

export type Ctx = typeof DrawflowStore

export const getContext = () => svelteContext('DrawflowStore') as Ctx
