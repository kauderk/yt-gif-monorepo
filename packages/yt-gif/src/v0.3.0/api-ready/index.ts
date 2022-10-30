import { RemovedElementObserver } from '$lib/utils'
import { URLResults } from './setup/url-result'
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
	const uidResult = await URLResults(wrapper)
	const { url, uid, grandParentBlock } = uidResult

	// don't add up false positives
	if (CheckFalsePositive({ ...uidResult, wrapper })) return null

	const newId = GetNewID()

	// OnPlayerReady video params point of reference
	const configParams = CreateConfigParams(newId, url)

	// target's point of reference
	const { blockID, record } = CreateRecordID(uidResult)

	// the div that the YTiframe will replace
	wrapper = CreateYTGIFElement({
		...params,
		...uidResult,
		customSpan: configParams.sp.value,
		newId,
	})

	// Observe children containers and recover active timestamps respectively
	const rm_container = SetupTimestampObserver(grandParentBlock, uid)

	const base = { rm_container, grandParentBlock, blockID }
	const that = TimestampRecovery(base)
	const instance = { wrapper, ...base, ...uidResult }

	// Set up btns
	tryToInsertControls(instance, record)

	// On removed from DOM clear Uid2Url map and deactivate timestamps
	RemovedElementObserver({
		el: grandParentBlock?.querySelector('span'),
		OnRemovedFromDom_cb: () =>
			RemovedFromDom({
				...instance,
				deployed: () => deployed,
				that,
				blockID,
				newId,
			}),
	})

	// Interaction
	if (AsyncDeployment(params.dataCreation)) {
		DeployAsync(that, {
			wrapper,
			url,
			configParams,
			deploy,
		})
	} else {
		await AssertParamsClickTimestamp(that, configParams)
		deploy()
	}

	return wrapper

	function deploy() {
		deployed = true
		record.wTarget = new window.YT.Player(newId, playerConfig(configParams))
	}
}
