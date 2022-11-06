import { get } from 'svelte/store'
import { saveCssShadeStyleVariables } from 'src/styles/pallete'
import { createWritableStore } from '$lib/local-storage-store'

// Theme / Color
const placeholder = {
	theme: 'dark' as 'dark' | 'light',
	pallet: {
		light: { color: '#e8e8e8', accent: '#5c7080', opposite: '#000000' },
		dark: { color: '#1a1a1a', accent: '#5c7080', opposite: '#ffffff' },
	},
}
const store = (): typeof placeholder | undefined => {
	if (typeof window === 'undefined') return
	if ('yt-gif-theme' in localStorage) {
		return JSON.parse(localStorage.getItem('yt-gif-theme')!)
	}
}
export const themeStore = createWritableStore(
	'yt-gif-theme',
	store() ?? placeholder
)

export const useDmmVars = createWritableStore('use-ddm-vars', true)

type Tm = 'dark' | 'light'
export const UpdateCssVars = (theme: Tm) => {
	const value = get(themeStore).pallet[theme].color
	const opposite = get(themeStore).pallet[theme].opposite
	saveCssShadeStyleVariables(value, '--ddm-', opposite)
}

// @ts-ignore
// window.updateColor = UpdateCssVars

export const switchTheme = (_theme: Tm) => {
	const theme = _theme == 'dark' ? 'light' : 'dark'

	UpdateCssVars(theme)
	themeStore.update(o => ({ ...o, theme }))
}
// Picker
export const UpdateTheme = () => {
	if (store()?.theme == get(themeStore).theme) {
		UpdateCssVars(get(themeStore).theme)
	}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDdmVars = (e: any, b?: b) => {
	document.documentElement.classList.toggle(
		'use-ddm-vars',
		e ? e.currentTarget.checked : b
	)
}
