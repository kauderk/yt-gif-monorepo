import {
	recordedIDs,
	StartEnd_Config,
	observedParameters,
} from '../../../../../lib/types/config'
import { simHoverOut, toggleAttribute } from '$lib/utils'
import {
	closestYTGIFparentID,
	getWrapperUrlSufix,
} from '../../../../../lib/dom/elements-yt-gif-parent'

export function GetRecordInfo(targetWrapper: QrySearch, f_uid: string) {
	const blockID = [...recordedIDs.keys()]
		.reverse()
		.find(k => k.startsWith(closestYTGIFparentID(targetWrapper))) as s
	const record = recordedIDs.get(blockID)
	const obsBlockID = [...observedParameters.keys()]
		.reverse()
		.find(k => k.endsWith(getWrapperUrlSufix(targetWrapper, f_uid))) as s
	const obsTimestampOrg = observedParameters.get(obsBlockID)
		?.lastActiveTimestamp as TlastActiveTm['lastActiveTimestamp']
	const timestamp = { ...obsTimestampOrg }
	return { record, timestamp, blockID }
}

export function TryGetValidTimestamp(tEl: IBtn) {
	return tEl.a.textContent?.match(StartEnd_Config.targetStringRgx)?.[0] as s
}
export function PauseOthersBut(targetWrapper: QrySearch) {
	return document
		.queryAllasArr('.yt-gif-wrapper')
		.filter(el => !el.closest('.ddm-tut')) // yikes
		.forEach(wrapper => {
			toggleAttribute(false, 'yt-active', wrapper)
			if (wrapper != targetWrapper) wrapper?.dispatchEvent(simHoverOut())
		})
}
