import { hasOneDayPassed_localStorage, isTrue, toggleClasses } from '$lib/utils'
import { cssData } from '../../config/paths'
import { ToggleIcons } from '../../dom/flip-tooltip'
import { getTutorialObj } from '../query'

export interface ITutorialInput {
	icon: Element
	mainDDM: Element
	ddm_focus: string
}
export function SetUpTutorials_smartNotification() {
	;['tut_update_ver']
		.map(id => document.querySelector(`[id="${id}"]`))
		.filter(el => el != null)
		.map(el => getTutorialObj(el as El))
		.filter(o => o.ok)
		.forEach(toggleIconOnChange)
}
type ITutObj = ReturnType<typeof getTutorialObj>
function toggleIconOnChange(o: ITutObj) {
	const { btn } = o
	const visualFeedback = GetVisualFeedback(o)
	btn.addEventListener('change', () => visualFeedback(btn.checked))

	CheckOnLocalStorage(o, visualFeedback)
}
function GetVisualFeedback(o: ITutObj) {
	return function (bol: b) {
		bol = ToggleIcons(bol, o.iconObj) //TODO: removed btn param
		toggleClasses(!bol, [cssData.dwn_pulse_anim], o.pulseElm)
	}
}
function CheckOnLocalStorage(
	{ btn, id }: ITutObj,
	visualFeedback: (bol: boolean) => void
) {
	if (hasOneDayPassed_localStorage(id)) {
		btn.checked = true
		btn.dispatchEvent(new Event('change'))
	} else {
		const sessionValue = window.YT_GIF_DIRECT_SETTINGS.get(id)?.sessionValue
		const bol =
			typeof sessionValue === 'undefined' ? true : isTrue(sessionValue)
		btn.checked = bol
		visualFeedback(bol)
	}
}
