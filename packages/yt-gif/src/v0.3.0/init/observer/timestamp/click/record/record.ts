import { HMSToSecondsOnly } from '$lib/utils'
import { closest_anchor_container } from '../../../../../lib/dom/elements-yt-gif-parent'
import { DeactivateTimestampsInHierarchy } from '../../../../timestamp/hierarchy'
import type { IClickInput } from '../../types'
import { getTimestampBoundaryObj } from './tmestamp'
import { PauseOthersBut, GetRecordInfo } from './query'

export function tryGetRecordBoundary(
	lastWrapper: QrySearch,
	validTimestamp: s,
	f_uid: string,
	ToggleBoundarySet: (bol: boolean, targetWrapper: QrySearch) => void,
	tmSetObj: IClickInput['tmSetObj']
) {
	// 1.
	PauseOthersBut(lastWrapper) // but this

	// 2.
	if (!validTimestamp) {
		return <typeof res>{ success: false }
	}

	// 2.1
	const { record, timestamp, blockID } = GetRecordInfo(lastWrapper, f_uid)

	// 3.
	DeactivateTimestampsInHierarchy(
		closest_anchor_container(lastWrapper),
		lastWrapper
	)
	ToggleBoundarySet(true, lastWrapper)

	const res = <const>{
		sameBoundaries: record?.sameBoundaries(),
		success: <boolean>true,

		record,
		obsTimestamp: timestamp,
		targetWrapper: lastWrapper,

		timestampObj: getTimestampBoundaryObj(
			HMSToSecondsOnly(validTimestamp),
			record,
			blockID,
			tmSetObj
		),
	}
	return res
}
