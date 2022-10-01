import { GetMainYTGIFicon, Focus, ListenFor, GetWholeEls } from './query'
import { cssData } from '$v3/init/config/paths'

export function DDMHover({ ddm_focus, ddm_info_message_selector } = cssData) {
	// 1. caution: special case
	const { icon, mainDDM } = GetMainYTGIFicon()
	const focus = Focus([ddm_focus]) // used inside two local func

	ListenFor(focus, icon, mainDDM)

	// 2. for all infoMessages in html
	;[...GetWholeEls(ddm_info_message_selector).entries()].forEach(
		([message, el]) => ListenFor(focus, message, el)
	)
}
