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
	//targetClass: string
	//dataCreation: string
	//message: string
}) {
	let { wrapper } = params
	if (!wrapper || !wrapper.parentNode) return null

	// search and get urlIndex and uid
	const uidResult = await URLResults(wrapper)
	const { url } = uidResult

	// don't add up false positives
	if (CheckFalsePositive({ ...uidResult, wrapper })) return null

	const newId = GetNewID()

	// OnPlayerReady video params point of reference
	const configParams = CreateConfigParams(newId, url)

	// target's point of reference
	const { record } = CreateRecordID(uidResult)

	deploy()

	return wrapper

	function deploy() {
		record.wTarget = new window.YT.Player(newId, playerConfig(configParams))
	}
}
