import { createWritableStore } from '$lib/local-storage-store'
import { getContext as Ctx, setContext as SetCtx } from 'svelte'
import { crossfade } from 'svelte/transition'
import { items } from './ctx'

export type TItem = {
	id: number
	icon: string
	title: string
	cmp: any
	GraphNodeID: string
}
export type TItems = TItem[]

export const defCrossfade = crossfade({})
export const getContext = () => Ctx('CrossfadeMenu') as TItems
export const setContext = () => SetCtx('CrossfadeMenu', items)

export const itemHistory = createWritableStore('itemHistory', {
	previous: { id: '', item: <TItem | null>null },
	current: { id: '', item: <TItem | null>null },
})
