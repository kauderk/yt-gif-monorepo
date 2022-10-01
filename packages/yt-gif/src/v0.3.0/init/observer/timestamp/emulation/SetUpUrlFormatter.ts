import { TryToUpdateBlock_fmt } from '../../../formatter/Flow'
import { fmtTimestampsUrlObj } from '../../../formatter/Flow/timestamp'

export function SetUpUrlFormatter(
	{
		block,
		targetNode,
		page,
		timestamp,
		startEndComponentMap,
		blockUid,
	}: T_urlBtnStt,
	tmSetObj: ItmSetObj
) {
	const { ytGifCmpt, compt2Url, urlBtn, confirmBtns } =
		fmtTimestampsUrlObj(targetNode)

	urlBtn('url').onclick = async e => await OnYtGifUrlBtn(e, compt2Url)
	urlBtn('yt-gif').onclick = async e => await OnYtGifUrlBtn(e, ytGifCmpt)
	confirmBtns()

	async function OnYtGifUrlBtn(e: Event, fmtCmpnt_cb: TFmtCb) {
		e.preventDefault()
		e.stopPropagation()

		const sel = (tm: s, p: s) =>
			`[timestamp="${tm}"][timestamp-style="${p}"]`
		const URL_formatter_settings = {
			block,
			targetNode,

			siblingSel: `[timestamp-style]`,
			selfSel: sel(timestamp, page),

			getMap: async () => startEndComponentMap,
			isKey: 'is component',

			fmtCmpnt_cb,
			tempUID: blockUid,

			from: {
				caster: 'timestamp',
				page,
				tmSetObj,
				urlBtn: e.target as El,
				sel,
			},
		}

		await TryToUpdateBlock_fmt(URL_formatter_settings as TblockUpd_fmt)
	}
}
export interface T_urlBtnStt {
	block: El
	targetNode: El
	page: s
	timestamp: s
	startEndComponentMap: Trm_map
	blockUid: s
}
