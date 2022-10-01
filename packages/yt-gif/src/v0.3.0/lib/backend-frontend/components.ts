import { recordedIDs, lastBlockIDParameters } from '../types/config'
import { convertHMS, seconds2time } from '$lib/utils'
import { properBlockIDSufix, floatParam } from '../utils'
import type { TVideoParams } from '$v3/lib/types/video-types'
import type { T_YT_RECORD } from '../types/yt-types'
import { ObjectValues } from '$lib/utils'
import type { ILastUrlObj, Trm_block, IFilters, Itime } from './types';
import { TIframeMap } from './types'

//#region get last cmpts utils

export function getYTGIFparams(
	blockObj: Trm_block,
	lastUrlObj: ILastUrlObj,
	filterUrlObj: IFilters,
	originBlockObj: Trm_block
) {
	const { match, index, componentMap } = lastUrlObj

	const possibleIDsfx = blockObj.uid + properBlockIDSufix(match, index)

	const filter = ObjectValues(filterUrlObj).find(x =>
		x.condition(possibleIDsfx)
	)

	const startObj = getBoundaryObj(floatParam('t|start', match).toString())
	const endObj = getBoundaryObj(floatParam('end', match).toString())

	return <const>{
		formats: getBoundaryObj(filter?.crrTime?.toString() || ''),
		foundBlock: {
			...blockObj,
			lastUrl: match,
			lastIndex: index,
			componentMap: componentMap,
			blockID: filter?.blockID,
			possibleBlockIDSufix: possibleIDsfx,
		},
		targetBlock: {
			...originBlockObj,
			start: startObj,
			end: endObj,
		},
		ok: <boolean>true,
	}
}
export function AssembleFilterObjs(): IFilters {
	// TODO: HMS: 000 to HMS: 0
	const endsWith = <T>(sfx: string, map: Map<StrSearch, T>) =>
		[...map.keys()].find(k => k?.endsWith(sfx))

	return <const>{
		targets: {
			...new TIframeMap(),
			condition: function (sfx: s): b {
				// prettier-ignore
				const val = AssertValue<T_YT_RECORD>(this, sfx, recordedIDs)?.wTarget?.getCurrentTime();
				return AssertCrrTime.call(this, val)
			},
		},
		lastParams: {
			...new TIframeMap(),
			condition: function (sfx: s): b {
				// prettier-ignore
				const val = AssertValue<TVideoParams>(this, sfx, lastBlockIDParameters)?.updateTime?.value;
				return AssertCrrTime.call(this, val)
			},
		},
	}

	// Alright... // FIXME:
	function AssertValue<T>(o: TIframeMap, sfx: s, map: Map<StrSearch, T>) {
		o.blockID = endsWith(sfx, map)
		return map.get(o.blockID) as T
	}
	function AssertCrrTime(this: TIframeMap, val: n | undefined) {
		this.crrTime = val ?? this.crrTime
		return val ? true : false
	}
}
function getBoundaryObj(v: string): Itime {
	return <const>{
		lessHMS: seconds2time(parseInt(v)),
		HMS: convertHMS(v),
		hmsSufix: seconds2time(parseInt(v), true),
		S: v,
	}
}
