import { addBlockTimestamp_smart_local } from './replace'

// 6.3
export async function registerKeyCombinations(e: KeyboardEvent) {
	if (!((e.ctrlKey || e.metaKey) && e.altKey)) return

	let pageRefSufx: startEnd | null = null
	if (e.key == 's')
		// Ctrl + Alt + s
		pageRefSufx = 'start'
	else if (e.key == 'd')
		// Ctrl + Alt + d
		pageRefSufx = 'end'
	if (!pageRefSufx) return

	await addBlockTimestamp_smart_local(pageRefSufx)
}
export function ToggleTimestampShortcuts(bol: b, keyupEventHandler: Function) {
	// remove them anyway, avoid duplicates
	document.removeEventListener('keydown', keyupEventHandler as EventListener)
	if (bol) {
		keyupEventHandler = registerKeyCombinations
		document.addEventListener('keydown', keyupEventHandler as EventListener)
	} else {
		// removed already
	}
}
