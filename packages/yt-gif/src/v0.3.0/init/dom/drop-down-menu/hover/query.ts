import { toggleClasses } from '$lib/utils'
import { cssData } from '$v3/init/config/paths'

export function ListenFor(
	focus: ReturnType<typeof Focus>,
	message: Element,
	el: Element
) {
	message.addEventListener('click', () => focus.Gain(message, el))
	message.addEventListener('blur', () => focus.Lost(el))
}
export function GetWholeEls(ddm_info_message_selector: s) {
	const infoMessages = document.queryAllasArr(ddm_info_message_selector)
	const validFocusMessage = new Map<El, El>()

	for (const i of infoMessages) {
		const possibleSubDdm = i.nextElementSibling
		if (possibleSubDdm?.classList.contains('dropdown-content')) {
			spanNegativeTabIndex(i)
			validFocusMessage.set(i, possibleSubDdm)
		}
	}
	return validFocusMessage
}
export function Focus(classNames: string[]) {
	function Gain(el: El | EventTarget, targetEl: Element) {
		;(el as HTMLElement).focus()
		toggleClasses(true, classNames, targetEl)
	}
	function Lost(targetEl: Element) {
		toggleClasses(false, classNames, targetEl)
	}
	return <const>{ Gain, Lost }
}
export function GetMainYTGIFicon({ ddm_icon } = cssData) {
	//
	const mainMenu = <HTMLElement>(
		document.querySelector('span.yt-gif-drop-down-menu-toolbar .dropdown')
	)
	const mainDDM = <HTMLElement>(
		document.querySelector(
			'span.yt-gif-drop-down-menu-toolbar .dropdown > .dropdown-content'
		)
	)
	const icon = <HTMLElement>document.querySelector('.' + ddm_icon)
	spanNegativeTabIndex(icon)
	return <const>{ icon, mainDDM, mainMenu }
}
function spanNegativeTabIndex(el: El) {
	if (el.tagName) el.setAttribute('tabindex', '-1') // because they are "span"
}
