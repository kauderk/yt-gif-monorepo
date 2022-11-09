import { getContext as Ctx, setContext as SetCtx } from 'svelte'
import { crossfade } from 'svelte/transition'

export type TItem = {
	id: number
	icon: string
	title: string
}
export type TItems = {
	id: number
	icon: string
	title: string
}[]

export const defCrossfade = crossfade({})
export const getContext = () => Ctx('CrossfadeMenu') as TItems
export const setContext = (entry: TItems) => SetCtx('CrossfadeMenu', entry)
