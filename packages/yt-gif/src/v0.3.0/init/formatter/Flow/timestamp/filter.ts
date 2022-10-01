import { fmtTimestamp } from '../../../timestamp/utils'
import { isSelected } from '../../../../lib/backend-frontend/option'
import { tryFmt_urlParam, assertTmParams } from '../../../../lib/helpers'
import { StartEnd_Config } from '../../../../lib/types/config'
import { UI } from '../../../config/yt-gif-init'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import { ObjectKeys } from '$lib/utils'
import type { IDoubleParams, TcontentObj } from '../../types';
import { toUrlKeys } from '../../types'
import type { Tfmt_tm } from './query'
import type { o } from './types'

//#region ExamineResObj Body

export function tryFmt_timestamp({ page, value, match }: Tfmt_tm) {
	// update url
	const p = page == 'end' ? 'end' : 't'
	const fmt = UI.timestamps.tm_workflow_grab.value != 'S' ? 'hmsSufix' : 'S'
	return tryFmt_urlParam({ match, value, p, fmt, float: false }) //TODO: float:null
}
export function fmtUrlsObj(
	duplicateParams: IDoubleParams,
	urlObj: IExtendedVideoParams
) {
	let params_ = ObjectKeys(toUrlKeys)
		.filter(
			// valid params
			k =>
				!duplicateParams.includes(k) &&
				// @ts-ignore
				toUrlKeys[k].ok(urlObj[k].value)
		)
		.reduce((acc, crr) => {
			const min = urlObj[crr].alias[0] || crr
			return acc + `&${min}=${urlObj[crr].value}`
		}, '')
		.slice(1) // remove first '&'

	const fmt = UI.timestamps.tm_workflow_grab.value != 'S' ? 'hmsSufix' : 'S'
	const params = assertTmParams(params_, fmt) // '?' for calculations purposes only

	const c = isSelected(UI.display.fmt_options, 'avoid_redundancy')
		? '/'
		: 'https://youtu.be/'
	const base = (_: s) => _ + urlObj.id.value

	return <const>{
		minimal: `${base('/')}?${params}`,
		full: `${base('https://youtu.be/')}?${params}`,
		fmtUrl: params.slice(1) ? `${base(c)}?${params}` : base(c),
	}
}
export function getPearTimestamp(
	from: o['from'],
	pear: keyof ItmSetObj = 'self'
) {
	return <const>{
		timestamp: from.tmSetObj?.[pear]?.timestamp,
		pear,
	}
}
export function TryToRemoveRedundantTmParam(
	contentObj: TcontentObj,
	{ timestamp, pear }: ReturnType<typeof getPearTimestamp>
) {
	if (!timestamp) {
		return contentObj.hidden
	}

	const value = fmtTimestamp()(timestamp)
	const rawValue = fmtTimestamp()(
		contentObj.content?.match(StartEnd_Config.targetStringRgx)?.[0] ?? '-1'
	)

	if (
		rawValue === value &&
		isSelected(UI.display.fmt_options, 'avoid_redundancy')
	) {
		if (pear == 'self')
			contentObj.content = contentObj.content
				.trim()
				.replace(timestamp.toString(), '')
		return contentObj.hidden.replace(timestamp.toString(), '')
	}
	return contentObj.hidden
}
