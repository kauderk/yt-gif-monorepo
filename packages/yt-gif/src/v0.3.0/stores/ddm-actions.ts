import { writable } from 'svelte/store'
export type TAction = 'click' | 'hover'
export const ddmAction = writable<TAction>('click')
export const ddmOpened = writable(false)
