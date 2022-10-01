import { s_u_f_key } from '../../../lib/types/config'
import type { ICustomChangeEvent } from '../../../lib/dom/select/CustomSelect'
import { ValidUrlBtnUsage } from '$v3/init/formatter/button/validation'

/* ****************** */

export function confirmUrlBtnUsage(bol: b, e: ICustomChangeEvent) {
	const canUse = ValidUrlBtnUsage()
	if (!bol || canUse) return

	const yesMessage = canUse
		? 'Simulate because I have both graph and localStorage keys'
		: 'Simulate, but first take me to the caution prompt - localStorage key is missing'

	const userMind = confirm(
		`YT GIF Url Button: Simulation Request\n\nYES: ${yesMessage} \n   -  https://github.com/kauderk/kauderk.github.io/blob/main/yt-gif-extension/install/faq/README.md#simulate-url-button-to-video-component \n\nNO: Don't simulate`
	)

	if (userMind) {
		localStorage.setItem(s_u_f_key, 'true')
		if (!canUse)
			window
				.open(
					'https://github.com/kauderk/kauderk.github.io/tree/main/yt-gif-extension/install/faq#caution-prompt',
					'_blank'
				)
				?.focus()
	} else {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
			e.currentTarget.customSelect?.(false) // this used to use be a chk tag/events, but since I'm changing them for "class CustomSelect()" a weird loop happens with the 'click' event handler...
			e.currentTarget.parentElement?.dispatchEvent(
				new Event('customChange')
			)
		}
		localStorage.removeItem(s_u_f_key)
	}
	return userMind
}
