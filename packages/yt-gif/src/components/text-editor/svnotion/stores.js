import { writable } from 'svelte/store'

export const slashVisible = writable(false)
export const slashItems = writable([])
export const slashLocaltion = writable({ x: 0, y: 0, height: 0 })
export const slashProps = writable({ editor: null, range: null })
export const desktopMenu = writable(true)
export const components = writable([])
export const editorWidth = writable(0)

export const createStore = () => {
	return {
		slashVisible: writable(false),
		slashItems: writable([]),
		slashLocaltion: writable({ x: 0, y: 0, height: 0 }),
		slashProps: writable({ editor: null, range: null }),
		desktopMenu: writable(true),
		components: writable([]),
		editorWidth: writable(0),
	}
}
