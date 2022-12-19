import { isSelected } from '../../../lib/backend-frontend/option'
import { s_u_f_key } from '../../../lib/types/config'
import { isTrue } from '$lib/utils'
import { UIStore } from '$v3/init/config/UIStore'

/* ***************** */

export function ValidUrlBtnUsage() {
	const key = s_u_f_key

	const binarySessionVal = (k: s) =>
		isTrue(
			window.YT_GIF_DIRECT_SETTINGS?.get(
				'ms_options'
				// @ts-ignore //TODO:
			)?.sessionValue?.includes?.(k)
		)

	const usageKey =
		binarySessionVal('override_' + key) ||
		isTrue(localStorage.getItem(key) as s)

	return usageKey && binarySessionVal(key)
}
export function valid_url_formatter() {
	return (
		isSelected(UIStore.get().display.ms_options, s_u_f_key)!! &&
		ValidUrlBtnUsage()
	)
}
