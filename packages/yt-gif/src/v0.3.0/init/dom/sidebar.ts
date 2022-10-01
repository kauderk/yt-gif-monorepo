import { openBlockInSidebar, setSideBarState } from '$lib/utils-roam-alpha-api'
import { innerElsContains, sleep } from '$lib/utils'
import { TARGET_PAGE, TARGET_UID } from '$v3/settings-page/keys'
import {
	ToggleIcons,
	getIconFlipObj,
	ToggleTooltips,
	getTooltipFlipObj,
} from './flip-tooltip'
import { GetMainYTGIFicon } from './drop-down-menu/hover/query'

export async function navigateToSettingsPageInSidebar() {
	const anySidebarInstance = () => Bars().length >= 1

	const { tooltip, icon } = GetTooltips()

	const visuals = (bol: b) => {
		ToggleTooltips(bol, tooltip)
		ToggleIcons(bol, icon)
	}
	const switchSidebar = () => visuals(anySidebarInstance())

	tooltip.el.addEventListener('click', async function () {
		// caution: how do you communicate with the other scripts? Interfaces? Events? WindowEvents?
		await setSideBarState(3)
		await sleep(50) // an observer is the safest option though

		if (!anySidebarInstance()) {
			visuals(true)
			await openBlockInSidebar(TARGET_UID) // backend execution... should it be here...? //https://stackoverflow.com/questions/12097381/communication-between-scripts-three-methods#:~:text=All%20JS%20scripts%20are%20run%20in%20the%20global%20scope.%20When%20the%20files%20are%20downloaded%20to%20the%20client%2C%20they%20are%20parsed%20in%20the%20global%20scope
		}

		// fires settings page instance
		await sleep(50)
		Bars()?.[0]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'nearest',
		})
	})

	tooltip.el.addEventListener('mouseenter', switchSidebar)

	const { icon: Icon } = GetMainYTGIFicon()
	Icon.addEventListener('blur', switchSidebar, true)
	Icon.addEventListener('mouseenter', switchSidebar, true)
	Icon.addEventListener('mouseleave', switchSidebar, true)
}
function GetTooltips() {
	const wrapper = document.querySelector('#navigate-to-yt-gif-settings-page')!
	const tooltip = getTooltipFlipObj(wrapper.querySelector(`[data-tooltip]`)!)
	const icon = getIconFlipObj(wrapper.querySelector(`input`)!)
	return { tooltip, icon }
}

function Bars() {
	return innerElsContains(
		'.rm-sidebar-outline .rm-title-display span',
		TARGET_PAGE
	)
}
