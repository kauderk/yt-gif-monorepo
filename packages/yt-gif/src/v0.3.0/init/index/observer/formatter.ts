import { s_u_f_key } from '../../../lib/types/config'
import { getOption } from '../../../lib/backend-frontend/option'
import { UIStore } from '$v3/init/config/UIStore'
import { valid_url_formatter } from '$v3/init/formatter/button/validation'
import { confirmUrlBtnUsage } from '../../observer/formatter/confirmation'
import {
	ToggleUrlBtnObserver,
	ToggleBtnsWithNoUrl,
} from '../../observer/formatter/toggle'
import { addCustomChangeListener } from '$v3/lib/dom/options'

export function ListenForUrlOptions(urlObserver: MutationObserver) {
	const url_formatter_option = getOption(
		UIStore.get().display.ms_options,
		s_u_f_key
	)

	const rely_on_hierarchy = getOption(
		UIStore.get().display.fmt_options,
		'rely_on_hierarchy'
	)

	const s_u_f_startUp = valid_url_formatter()
	url_formatter_option.customSelect(s_u_f_startUp)
	ToggleUrlBtnObserver(s_u_f_startUp, urlObserver)
	ToggleBtnsWithNoUrl(rely_on_hierarchy.selected)

	addCustomChangeListener(url_formatter_option, e =>
		confirmUrlBtnUsage(e.detail.currentValue, e)
	)
	addCustomChangeListener(url_formatter_option, e =>
		ToggleUrlBtnObserver(e.target.selected, urlObserver)
	)
	addCustomChangeListener(rely_on_hierarchy, e =>
		ToggleBtnsWithNoUrl(e.target.selected)
	)
}
