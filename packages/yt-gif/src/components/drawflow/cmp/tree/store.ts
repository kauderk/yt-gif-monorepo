import { writable } from 'svelte/store'

export const isActive = writable('')
export const activate = (activeName: s) => {(isActive.set(activeName))}

