import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { dragAndDrop } from '../plugins/drag-drop'
import type { multiDrag } from '../plugins/multi-drag'

import { writable } from 'svelte/store'
import { getContext as svelteContext } from 'svelte'

export const DrawflowStore = writable({
	editor: <Drawflow & { precanvas: HTMLElement }>{},
	dnd: <ReturnType<typeof dragAndDrop>>{},
	mul: <ReturnType<typeof multiDrag>>{},
	drawflowRoot: <HTMLElement>{},
	templateDragableRoot: <HTMLElement>{},
	minimap: <HTMLElement>{},
})
export type Ctx = typeof DrawflowStore
export const getContext = () => svelteContext('DrawflowStore') as Ctx

export const DefaultProps = { canvas: { height: '100vh' } }
export const DrawflowProps = writable(DefaultProps)
export type Prs = typeof DrawflowProps
export const getProps = () => svelteContext('DrawflowProps') as Prs

export const nodeBG = writable('rgba(131, 131, 131, 0.4)')
