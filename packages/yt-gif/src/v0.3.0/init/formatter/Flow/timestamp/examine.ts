import { isSelected } from '../../../../lib/backend-frontend/option'
import { getConcatS } from '../../../../lib/helpers'
import { UIStore } from '$v3/init/config/UIStore'
import { ExtractParamsFromUrl } from '../../query/extract'
import { UrlBtnAction2InfoObj } from '../../query/match-info'
import {
	RemovePearFromString,
	tryFmt_timestamp_pear,
	TryToAppendHiddenPearContent,
} from './from.start-end'
import { TryToAssertHierarchyUrl, TryToReorderTmParams } from './to.url-ytgif'
import {
	TryToRemoveRedundantTmParam,
	getPearTimestamp,
	tryFmt_timestamp,
	fmtUrlsObj,
} from './filter'
import type { TIndexPair } from '../../query/regex'

export type TRes = Awaited<ReturnType<typeof ExamineResObj>>
export async function ExamineResObj(resObj: TResObjUrlBtn) {
	const { capture, from, to } = resObj
	const { contentObj, matchObj, hiddenObj } = UrlBtnAction2InfoObj(capture)
	const { lastUrl, url } = await TryGetUrlMatches(resObj, matchObj)

	//#region body
	matchObj.match = url

	contentObj.hidden = TryAssignMatch(contentObj)

	// remove redundant tm
	contentObj.hidden = TryToRemoveRedundantTmParam(
		contentObj,
		getPearTimestamp(from, 'self')
	)

	// append page param if missing
	matchObj.match = tryFmt_timestamp({
		page: from.page,
		value: getPearTimestamp(from).timestamp,
		match: matchObj.match,
	})
	//#endregion

	if (['start', 'end'].some(p => p == to[0])) {
		const foundUrl = getFmtUrl(to, url)
		const lastFmtUrl = getLastFmtUrl(to, lastUrl)

		if (differentUrls(hiddenObj, foundUrl, lastFmtUrl)) {
			const c = getConcatS(contentObj.hidden)
			contentObj.hidden += `${c + foundUrl} `
		}
	}

	//
	else if (['start', 'end'].some(p => p == from.page)) {
		// append pear content
		if (isSelected(UIStore.get().display.fmt_options, 'lift_pears')) {
			const pearCaptureObj = await RemovePearFromString(from, resObj)
			matchObj.match = await tryFmt_timestamp_pear(
				pearCaptureObj?.matchObj?.match,
				matchObj.match,
				from
			)
			contentObj.hidden += TryToAppendHiddenPearContent(
				pearCaptureObj,
				contentObj
			)
			contentObj.hidden = TryToRemoveRedundantTmParam(
				contentObj,
				getPearTimestamp(from, 'pear')
			)
		}
	}
	if (['url', 'yt-gif'].some(t => t == to[0])) {
		// sometimes end comes before start, fix that
		matchObj.match = TryToReorderTmParams(from.page, matchObj.match as s)
	}

	// update vars
	return <const>{
		url: matchObj.match,
		hidden: contentObj.hidden,
		space: resObj.string[resObj.end],
	}
}
function differentUrls(
	hiddenObj: TIndexPair,
	fmtUrl: string,
	lastFmtUrl: string | null
) {
	return !(hiddenObj?.match as s)?.includes?.(fmtUrl) && fmtUrl != lastFmtUrl
}

function getLastFmtUrl(to: Tpage[], lastUrl: string) {
	const param = !lastUrl
		? { fmtUrl: null }
		: fmtUrlsObj(to, ExtractParamsFromUrl(lastUrl))
	return param.fmtUrl
}

function getFmtUrl(to: Tpage[], url: string) {
	const param = fmtUrlsObj(to, ExtractParamsFromUrl(url))
	return param.fmtUrl
}

async function TryGetUrlMatches(
	resObj: TResObjUrlBtn,
	matchObj: TUrlMatchObjs['matchObj']
) {
	let _match = matchObj.match
	const lastUrl = await TryToAssertHierarchyUrl(resObj)
	if (!_match && SelectedRelyOnHierarchy()) {
		_match = lastUrl
	}
	if (!_match) {
		throw new Error(`YT GIF URL Formatter: Missing video url...`)
	}
	return <const>{
		lastUrl,
		url: GetUrl(matchObj, _match),
	}
}
type TUrlMatchObjs = ReturnType<typeof UrlBtnAction2InfoObj>
function TryAssignMatch(contentObj: TUrlMatchObjs['contentObj']) {
	if (typeof contentObj.match == 'undefined') {
		// Hmmm...
		return contentObj.content
	}
	return contentObj.hidden
}

function GetUrl({ type }: TIndexPair, _match: string) {
	return type == 'minimal' ? 'https://youtu.be' + _match : _match
}

function SelectedRelyOnHierarchy() {
	// try to keep running the logic, if there isn't a match exit
	return isSelected(UIStore.get().display.fmt_options, 'rely_on_hierarchy')
}
