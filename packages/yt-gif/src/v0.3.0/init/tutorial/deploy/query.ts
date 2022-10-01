import { toggleClasses } from '$lib/utils'
import { isRendered } from '../../../lib/dom/elements-yt-gif-parent'
import { cssData } from '../../config/paths'

export function FocusOnHover(
	awaitingWrapper: HTMLElement,
	icon: Element,
	local: ReturnType<typeof Local>
) {
	awaitingWrapper.addEventListener(
		'mouseenter',
		function (this: HTMLElement) {
			icon.dispatchEvent(new Event('click'))
			local.UnfocusOthers(true)
			visualFeedback(this, false)
		}
	)
	awaitingWrapper.addEventListener(
		'mouseleave',
		function (this: HTMLElement) {
			local.FocusParents(true)
			visualFeedback(this, true)
		}
	)
}
export function Local(input: IInput, wrapper: HTMLElement, parentTarget: El) {
	const { icon, mainDDM, ddm_focus } = input
	const getContent = () => parentTarget?.closest('.dropdown-content') as El

	function blur() {
		if (!isRendered(wrapper)) {
			icon.removeEventListener('blur', blur)
		} else {
			FocusParents(false)
		}
	}
	function FocusParents(toggle = true) {
		//const ownContent =
		;[getContent(), mainDDM].forEach(el =>
			toggleClasses(toggle, [ddm_focus], el)
		)

		if (toggle) {
			icon.dispatchEvent(new Event('click'))
		}
	}
	function UnfocusOthers(toggle: b) {
		document
			.queryAllasArr('.dropdown-item.yt-gif-wrapper-parent')
			.map(tut => tut.closest('.dropdown-info-box.dropdown-focus'))
			.filter((v, i, a) => !!v && v != getContent() && a.indexOf(v) === i)
			.forEach(el => toggleClasses(!toggle, [ddm_focus], el as El))
	}
	return <const>{ blur, FocusParents, UnfocusOthers }
}
function visualFeedback(el: El, bol: b) {
	toggleClasses(bol, [cssData.ddn_tut_awaiting], el)
}
export interface IInput {
	icon: El
	mainDDM: El
	ddm_focus: s
}
