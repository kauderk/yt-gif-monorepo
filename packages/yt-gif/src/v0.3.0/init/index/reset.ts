import { DDM_Els } from '../dom/fetch'
import { SrrGlobal } from '$lib/global/SrrGlobal'

export function ResetMasterObservers() {
	// 0. the objects "UI", "links", "attrData" and "cssData" are binded to all of these functions
	if (DDM_Els().length > 0) {
		try {
			SrrGlobal.YT_GIF_OBSERVERS.CleanMasterObservers()
			SrrGlobal.YT_GIF_OBSERVERS.CleanLoadedWrappers()
			SrrGlobal.YT_GIF_OBSERVERS.masterIframeBuffer = new Array()
		} catch (err) {
			console.warn(`YT GIF's Masters observers are not defined.`)
		}
		console.log('Reinstalling the YT GIF Extension')
	}
}
