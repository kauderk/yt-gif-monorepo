import { lastBlockIDParameters } from '$v3/lib/types/config'
import { UI } from '$v3/init/config/yt-gif-init'
import type { TVideoParams } from '$v3/lib/types/video-types'
import type { ILocal } from '../lib/TStat'
import type { TQueryResult } from './GetQuery'

//#region 1. previous parameters
export function setupPreviousParams(o: ILocal, q: TQueryResult) {
	const session = lastBlockIDParameters.get(o.entry.blockID)
	if (!session) {
		return
	}

	const { url_boundaries, url_volume } = UI.playerSettings

	// TODO: add noun types: strict | soft
	// prettier-ignore
	const start = GetPreviousStart(session, url_boundaries.value, o.entry.start, q.isBounded);
	if (start != undefined) {
		q.seekToUpdatedTime(start)
	}

	const volume = GetPreviousVolume(session, url_volume.value, o.entry.volume)
	if (volume != undefined) {
		o.update.volume = volume
	}
}
/* ******************* */
function GetPreviousVolume(session: TVideoParams, value: string, entryVal: n) {
	if (value == 'strict') {
		const vl_Hist = session.volume.history

		if (vl_Hist[vl_Hist.length - 1] != entryVal) {
			// new entry is valid ≡ user updated "&vl="
			vl_Hist.push(entryVal)
			return entryVal
		}

		// updateVolume has priority
		else return session.volume.update
	}

	//
	else if (value == 'soft') return session.volume.update
	//if (value == 'start-only')
	//else return getMapVolume()
}
function GetPreviousStart(
	session: TVideoParams,
	value: string,
	entryVal: number,
	isBounded: (x: number) => boolean
) {
	if (value == 'strict') {
		const timeHist = session.timestamps.history

		if (timeHist[timeHist.length - 1] != entryVal) {
			// new entry is valid ≡ user updated "?t="
			timeHist.push(entryVal)
			return entryVal
		}

		//
		else {
			return session.updateTime.value
		}
	}

	//
	else if (value == 'soft' && isBounded(session.updateTime.value)) {
		return session.updateTime.value
	}
}
