import { writable } from 'svelte/store'

type Theme = 'system' | 'light' | 'dark'

const theme = writable<Theme>('system')

export { theme }
