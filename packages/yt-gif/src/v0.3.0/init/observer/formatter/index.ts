import { toggleClasses } from '$lib/utils'
import { fmtIframe2Url } from '../../formatter/Flow/url'
import { fmtTimestampsUrlObj } from '../../formatter/Flow/timestamp'
import { validTmParam } from '../../../lib/helpers'
import { NodesRecord, getYTUrlObj } from './filter'
import { OnYtGifUrlBtn } from './update'
import { appendlUrlBtns } from '$v3/init/formatter/button/creation'

//#region 7. url btn emulation
export function ReadyUrlBtns(added: HTMLElement[]) {
	for (const rm_btn of added) {
		toggleClasses(true, ['yt-gif'], rm_btn)
		appendlUrlBtns(rm_btn)

		const Ref = (cb: TFmtCb) => ({ target: rm_btn, fmtCmpnt_cb: cb })

		if (validTmParam(getYTUrlObj(rm_btn).url)) {
			const i = fmtIframe2Url(rm_btn)
			i.urlBtn('format').onclick = async e =>
				OnYtGifUrlBtn(e, Ref(i.updUrl), { param: 't', float: false })
		}

		const o = fmtTimestampsUrlObj(rm_btn)
		const { urlBtn } = o

		urlBtn('yt-gif').onclick = async e => OnYtGifUrlBtn(e, Ref(o.ytGifCmpt))

		urlBtn('start').onclick = async e => OnYtGifUrlBtn(e, Ref(o.startCmpt))

		urlBtn('end').onclick = async e => OnYtGifUrlBtn(e, Ref(o.endCmpt))

		urlBtn('start|end').onclick = async e =>
			OnYtGifUrlBtn(e, Ref(o.startEndCmpt))

		o.confirmBtns()
	}
}

export async function InlineUrlBtnMutations_cb(
	mutationsList: MutationRecord[]
) {
	let added: HTMLElement[] = []
	for (const { addedNodes } of mutationsList)
		added = [...added, ...NodesRecord(addedNodes, 'bp3-icon-video')]

	ReadyUrlBtns(added)
}
