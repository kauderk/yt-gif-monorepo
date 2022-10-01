import { YTGIF_Config } from '../../../lib/types/config'
import { isTrue, ObjectKeys } from '$lib/utils'
import { targets } from './targets'

function GetDeployStateDriver(target = targets) {
	const state = {
		currentKey: 'yt_gif' as rm_key,
		initialKey: '' as rm_key,
		currentClassesToObserver: Array<string>(),
	}
	return {
		state,
		checkSubDeploymentStyle(key: rm_key, bol: b) {
			target[key].checkSubDeploymentStyle(bol)
		},
		RunMasterObserverWithKey(key: rm_key) {
			state.currentKey = key
			target[key].runMasterObservers()
		},
		//
		assertCurrentKey(overrideKey: string) {
			const newKey = getNewKey(overrideKey)
			state.currentClassesToObserver = getClassesToObserve(newKey)
			YTGIF_Config.componentPage = getComponentPage(newKey)
			return (state.currentKey = newKey)
		},
		ChargeMasterObserversWithValidDeploymentStyle() {
			// prettier-ignore
			const valid = ObjectKeys(target)
				.filter(k => target[k].hasOwnProperty('deploymentStyle')) as rm_key[]
			valid.some(key => {
				if (isTrue(target[key].deploymentStyle())) {
					this.RunMasterObserverWithKey(key) // trust me
					return true
				}
			})
		},
	}
	function getNewKey(overrideKey: string | boolean) {
		let newKey: rm_key = 'yt_gif' // this can be shorter for sure, how though?

		if (isTrue(overrideKey)) {
			newKey = 'video'
		} else if (overrideKey === 'both') {
			newKey = 'both'
		}
		return newKey
	}
	function getComponentPage(newKey: rm_key) {
		return newKey == 'both' ? 'yt-gif|video' : target[newKey].page
	}
	function getClassesToObserve(newKey: rm_key) {
		return newKey == 'both'
			? target[newKey].classesToObserve
			: [target[newKey].classToObserve]
	}
}
export const rm_components = GetDeployStateDriver()
window.AvoidCircularDependency.getCurrentClassesToObserver = function () {
	return rm_components.state.currentClassesToObserver
}
