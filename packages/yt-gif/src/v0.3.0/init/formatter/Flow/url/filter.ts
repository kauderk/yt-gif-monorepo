import { paramRgx } from '../../../../lib/utils'
import {
	tryFmt_urlParam,
	assertTmParams,
	getAnyTmParamType,
} from '../../../../lib/helpers'
import { UI } from '../../../config/yt-gif-init'
import { ExtractUrlsObj } from '../../query/extract'
import { UrlBtnAction2InfoObj } from '../../query/match-info'

export async function FilterToUrl(o: TResObj) {
	const actionObj = UrlBtnAction2InfoObj(o.capture, ExtractUrlsObj)
	let match = actionObj.matchObj.match as s
	let fmt = getAnyTmParamType(match)
	fmt = fmt == 'S' ? 'hmsSufix' : 'S'
	actionObj.matchObj.match = assertTmParams(match, fmt)
	return getResults(actionObj)
}

export async function ExamineResObj(resObj: TResObjExtraVals) {
	const actionObj = UrlBtnAction2InfoObj(resObj.capture, ExtractUrlsObj)

	actionObj.matchObj.match = tryFmt_urlParam({
		match: actionObj.matchObj.match as s,
		value:
			resObj.from.value ??
			paramRgx(resObj.from.param)?.exec(
				actionObj.matchObj.match as s
			)?.[2],
		p: resObj.from.param,

		fmt: UI.timestamps.tm_workflow_grab.value as keyof Itime,

		float: resObj.from.float ?? false,
	})

	// update vars
	return getResults(actionObj)
}
function getResults(actionObj: ReturnType<typeof UrlBtnAction2InfoObj>) {
	return <const>{
		url: actionObj.matchObj.match,
		hidden: actionObj.contentObj.hidden,
	}
}
