import { fetchTextTrimed } from '$lib/utils'
import { links } from '../config/paths'
import {
	smart_LoadCSS,
	smart_CssPlayer_UCS,
	smart_Load_DDM_onTopbar,
	smart_LoadStyle,
} from '../dom/fetch'
import { isApple } from '../../lib/browser/validation'

export async function LoadHTML() {
	links.html.fetched.playerControls = await fetchTextTrimed(
		links.html.playerControls
	)
	links.html.fetched.urlBtn = await fetchTextTrimed(links.html.urlBtn)
	links.html.fetched.insertOptions = await fetchTextTrimed(
		links.html.insertOptions
	)
	links.html.fetched.anchor = await fetchTextTrimed(links.html.anchor)

	await smart_Load_DDM_onTopbar(links.html.dropDownMenu)
}
export async function LoadCSS() {
	await smart_LoadCSS(links.css.index, `yt-gif-styles`)

	if (isApple()) {
		const apple = await import('./../../lib/browser/safari.css')
		await smart_LoadStyle(apple.default, `yt-gif-styles-apple`)
	}

	smart_CssPlayer_UCS(
		window.YT_GIF_DIRECT_SETTINGS.get('player_span')?.sessionValue as s
	)
}
