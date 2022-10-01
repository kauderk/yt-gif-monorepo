import { DDM_Els } from '../dom/fetch'

export function ResetMasterObservers() {
	// 0. the objects "UI", "links", "attrData" and "cssData" are binded to all of these functions
	if (DDM_Els().length > 0) {
		try {
			window.YT_GIF_OBSERVERS.CleanMasterObservers()
			window.YT_GIF_OBSERVERS.CleanLoadedWrappers()
			window.YT_GIF_OBSERVERS.masterIframeBuffer = new Array()
		} catch (err) {
			console.warn(`YT GIF's Masters observers are not defined.`)
		}
		console.log('Reinstalling the YT GIF Extension')
	}
}
