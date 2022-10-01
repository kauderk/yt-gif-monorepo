import {
	getConcatS,
	NonReferencedPerBlock,
	replaceString,
	isSpace,
	delSubstr,
	rgx2Gm,
} from '../../../../lib/helpers'
import { StartEnd_Config } from '../../../../lib/types/config'
import type { TcontentObj, TpearCaptureObj } from '../../types'
import { indexPairObj } from '../../query/regex'
import { UrlBtnAction2InfoObj } from '../../query/match-info'
import { TryToUpdateBlockSubString } from '../../update'
import { tryFmt_timestamp } from './filter'

// from.page start, end
export async function RemovePearFromString(
	from: TResObjUrlBtn['from'],
	resObj: TResObj
) {
	if (!from.tmSetObj?.pear) return null

	const {
		ObjAsKey,
		block,
		targetNode,
		timestamp: tm,
		page: p,
	} = from.tmSetObj.pear
	const selfIndex = NonReferencedPerBlock(
		block,
		from.sel(tm, p),
		targetNode
	).indexOf(targetNode)

	const { uid, capture } = ObjAsKey ?? {}
	if (!uid || !capture || selfIndex == -1)
		throw new Error(`YT GIF URL Formatter: Missing pear uid or capture...`)

	const resPear = await TryToUpdateBlockSubString(
		uid,
		selfIndex,
		capture,
		resObj.recycledRequest
	)

	if (!resPear.success)
		throw new Error(`YT GIF URL Formatter: Failed to update pear...`)

	resObj.string = replaceString({ ...resPear, replace: '' })

	const selfBound = resObj.start + resObj.end
	const pearBound = resPear.start + resPear.end

	if (selfBound > pearBound) {
		// THIS could be dumb as fuck. People could acutually lose information if I fuck up
		if (
			isSpace(resObj.string[resPear.start]) &&
			isSpace(resObj.string[resPear.end + 1])
		)
			resObj.string = replaceString(
				Object.assign({ ...resPear }, { end: resPear.start + 1 })
			)
		resObj.start -= capture.length
		resObj.end -= capture.length
	} else if (
		isSpace(resObj.string[resPear.start - 1]) &&
		isSpace(resObj.string[resPear.start])
	) {
		resObj.string = delSubstr(
			resObj.string,
			resPear.start - 1,
			resPear.start
		)
	}

	return UrlBtnAction2InfoObj(capture, ExtractTmsObj_cb)

	function ExtractTmsObj_cb(string: s) {
		return indexPairObj(
			rgx2Gm(StartEnd_Config.targetStringRgx),
			string,
			'timestamp'
		)?.[0]
	}
}
export async function tryFmt_timestamp_pear(
	match: string | undefined,
	fallbackMatch: s,
	from: TResObj['from']
) {
	const value = match
	if (!value) return fallbackMatch
	const page = from.tmSetObj?.pear?.page
	return tryFmt_timestamp({
		page,
		value,
		match: fallbackMatch as s,
	})
}
export function TryToAppendHiddenPearContent(
	pearCaptureObj: TpearCaptureObj | null,
	contentObj: TcontentObj
) {
	const h = pearCaptureObj?.contentObj?.hidden
	if (!h) return ''
	contentObj.content ??= ''
	const c = getConcatS(contentObj.content)
	return c + pearCaptureObj.contentObj?.content?.trim() + ' '
}
