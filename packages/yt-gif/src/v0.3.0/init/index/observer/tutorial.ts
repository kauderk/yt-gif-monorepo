import { cssData } from '../../config/paths'
import { GetMainYTGIFicon } from '../../dom/drop-down-menu/hover/query'
import { DDMAction } from '../../dom/drop-down-menu/open-close'

export function RunTutorialsObserver() {
	const { mainDDM, mainMenu, icon } = GetMainYTGIFicon()
	// if the user entered/initialized/played the tutorial,
	// the ddm won't be closed until it losses focus,
	// conventionally clicking anything but the ddm/ddm-children
	const menu = DDMAction({ mainDDM, mainMenu, ...cssData })
	mainMenu.addEventListener('mouseenter', menu.open)
	mainMenu.addEventListener('mouseleave', menu.tryClose)
	icon.addEventListener('blur', menu.tryClose)

	new MutationObserver(menu.mutationCallback)
		// when closed, clean tutorials -> wrappers
		.observe(mainDDM, { attributes: true })
	return <const>{ icon, mainDDM }
}
