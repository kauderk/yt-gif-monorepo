import { toggleClasses } from '$lib/utils'
import { cssData } from '../../config/paths'

/* ****************** */
export function Show() {
	const { dropdown__hidden, dropdown_deployment_style, dwp_message } = cssData
	const subHiddenDDM = document.querySelector(
		`.${dropdown__hidden}.${dropdown_deployment_style}`
	)!
	const subHiddenDDM_message = subHiddenDDM.querySelector(`.${dwp_message}`)!

	function visualFeedback(bol: b) {
		isSubMenuHidden(bol)
		isSubDDMpulsing(!bol)
	}
	function isSubMenuHidden(bol: b) {
		const hiddenClass = [`${cssData.dropdown__hidden}`]
		toggleClasses(bol, hiddenClass, subHiddenDDM)
	}
	function isSubDDMpulsing(bol: b) {
		const pulseAnim = [cssData.dwn_pulse_anim] // spagguetti
		toggleClasses(bol, pulseAnim, subHiddenDDM_message) // spagguetti
	}
	return <const>{ visualFeedback, subHiddenDDM }
}
