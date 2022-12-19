import { isTrue, toggleClasses } from '$lib/utils'
import { links } from '../config/paths'
import type { T_SettingsAny } from '$v3/settings-page/types'
import { smart_LoadCSS } from './fetch'
import { cssData } from '$v3/init/config/paths'
import { UIStore } from '$v3/init/config/UIStore'
import type { InputProxy } from '$v3/init/config/UIStore/types'

/* ************* */
export function ToggleTheme(
	Switch = UIStore.get().dropdownMenu.ddm_css_theme_input,
	themes = links.css.themes,
	ddm_css_theme_stt = window.YT_GIF_DIRECT_SETTINGS.get(
		'ddm_css_theme_input'
	)!,
	ddm_main_theme_id = cssData.id.ddm_main_theme
) {
	return new Error('Deprecated: ToggleTheme')

	const icons = ['bp3-icon-flash', 'bp3-icon-moon']

	flip(Switch)

	Switch.addEventListener('change', flip.bind(null, Switch))

	async function flip(tEl: InputProxy) {
		const previousIcons = Array.from(tEl?.classList)?.filter(el =>
			el.startsWith('bp3-icon-')
		)
		toggleClasses(false, previousIcons, tEl)

		toggleClasses(true, [!tEl.checked ? icons[0] : icons[1]], tEl)
		await smart_LoadCSS(
			//TODO: added isTrue
			themes.toogle(isTrue(ddm_css_theme_stt.sessionValue as s)),
			ddm_main_theme_id
		)
	}
}
