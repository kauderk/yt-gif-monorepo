import { UI } from '$v3/init/config/yt-gif-init'
import { playIs } from './IFR'

//#region hover/interactions utils

export function anyValidInAndOutKey(e: MouseEvent) {
	if (e.buttons == 4) {
		return true
	}

	return (
		UI.defaultValues.InAndOutKeys.split(',')
			.map(s => s.trim())
			.filter(s => !!s)
			// @ts-ignore
			.some(k => e[k])
	)
}
export function AnyPlayOnHover() {
	return playIs('soft') || playIs('strict')
}
