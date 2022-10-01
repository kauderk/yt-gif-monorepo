import { UI } from '$v3/init/config/yt-gif-init'

//#region validate - check values utils

export function CanUnmute() {
	// NotMuteAnyHover
	return !muteIs('soft') && !muteIs('all_muted')
}
//#endregion
//#region play/pause utils

export function muteIs(v: TmuteStyle) {
	return 'strict' == v
}
type TplayStyle = 'strict' | 'soft' | 'all_visible'
export function playIs(v: TplayStyle) {
	const play = 'strict'
	const is = play == v
	return is // && !getOption(play, v).disabled;
}
