import { UI } from '$v3/init/config/yt-gif-init'

//#region validate - check values utils

export function CanUnmute() {
	// NotMuteAnyHover
	return !muteIs('soft') && !muteIs('all_muted')
}
//#endregion
//#region play/pause utils

export function muteIs(v: TmuteStyle) {
	return UI.playerSettings.mute_style.value == v
}
type TplayStyle = 'strict' | 'soft' | 'all_visible'
export function playIs(v: TplayStyle) {
	const play = UI.playerSettings.play_style
	const is = play.value == v
	return is // && !getOption(play, v).disabled;
}
