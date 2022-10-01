import { applyIMGbg, removeIMGbg } from '$lib/utils'
import { cssData } from '$v3/init/config/paths'

export function ToggleThumbnails(
	thumbnail_as_bg: HTMLOptionElement,
	{ awaitng_player_user_input } = cssData
) {
	// BIND TO SETTINGS PAGE
	thumbnail_as_bg.addEventListener('customChange', function (e: Event) {
		const awaitingGifs = document
			.queryAllasArr<HTMLElement>(`.${awaitng_player_user_input}`)
			.forEach(el => {
				if ((e.target as HTMLOptionElement).selected)
					applyIMGbg(el, el.getAttribute('data-video-url') as s)
				else removeIMGbg(el) // spaguetti
			})
	})
}
