import { RemovedElementObserver } from '$lib/utils'
import type { URLResults } from './setup/url-result'
import { tryToInsertControls } from './setup/formatter'
import { DeployAsync } from './deploy/async'
import { playerConfig } from './deploy/config'
import { TimestampRecovery } from './observer/timestamp-recovery/driver'
import { AssertParamsClickTimestamp } from './observer/timestamp-recovery/click'
import {
	CheckFalsePositive,
	GetNewID,
	CreateConfigParams,
	CreateRecordID,
	CreateYTGIFElement,
	SetupTimestampObserver,
	AsyncDeployment,
} from './setup/query'
import { RemovedFromDom } from './observer/removed'

export async function onYouTubePlayerAPIReady(params: {
	wrapper: HTMLElement
	targetClass: string
	dataCreation: string
	message: string
}) {
	let { wrapper } = params
	if (!wrapper || !wrapper.parentNode) return null
	let deployed = false

	// search and get urlIndex and uid

	// Observe children containers and recover active timestamps respectively
	// FIXME: Timestamp Recovery is a plugin
	// const rm_container = SetupTimestampObserver(grandParentBlock, uid)

	// const base = { rm_container, grandParentBlock, blockID }
	// const that = TimestampRecovery(base)
	// const instance = { wrapper, ...base, ...uidResult }

	// Set up btns
	// FIXME: USE SVELTE
	// tryToInsertControls(instance, record)

	// On removed from DOM clear Uid2Url map and deactivate timestamps
	// FIXME: USE SVELTE
	// RemovedElementObserver({
	// 	el: grandParentBlock?.querySelector('span'),
	// 	OnRemovedFromDom_cb: () =>
	// 		RemovedFromDom({
	// 			...instance,
	// 			deployed: () => deployed,
	// 			that,
	// 			blockID,
	// 			newId,
	// 		}),
	// })

	// // Interaction
	// if (AsyncDeployment(params.dataCreation)) {
	// 	DeployAsync(that, {
	// 		wrapper,
	// 		url,
	// 		configParams,
	// 		deploy,
	// 	})
	// } else {
	// 	await AssertParamsClickTimestamp(that, configParams)
	// 	deploy()
	// }

	return wrapper
}
