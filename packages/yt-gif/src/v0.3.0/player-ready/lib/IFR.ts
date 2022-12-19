import { UIStore } from '$v3/init/config/UIStore'

//#region validate - check values utils

export function CanUnmute() {
	// NotMuteAnyHover
	return !muteIs('soft') && !muteIs('all_muted')
}
//#endregion
//#region play/pause utils

export function muteIs(v: TmuteStyle) {
	return UIStore.get().playerSettings.mute_style.value == v
}
type TplayStyle = 'strict' | 'soft' | 'all_visible'
export function playIs(v: TplayStyle) {
	const play = UIStore.get().playerSettings.play_style
	const is = play.value == v
	return is // && !getOption(play, v).disabled;
}
