import { createWritableStore } from '$lib/local-storage-store'
import { getContext as Ctx, setContext as SetCtx } from 'svelte'
import { crossfade } from 'svelte/transition'
import { type TItemCtx, items } from './ctx'

export type TItem = TItemCtx
export type TItems = TItemCtx[]

export const defCrossfade = crossfade({})
export const getContext = () => Ctx('CrossfadeMenu') as TItems
export const setContext = () => SetCtx('CrossfadeMenu', items)

type Falsy<T> = undefined | null | T
export const itemHistory = createWritableStore('itemHistory', {
	previous: { id: <Falsy<n>>null, item: <Falsy<TItem>>null },
	current: { id: <Falsy<n>>null, item: <Falsy<TItem>>null },
})

export const opened = createWritableStore('opened-item', <Falsy<TItemCtx>>null)
