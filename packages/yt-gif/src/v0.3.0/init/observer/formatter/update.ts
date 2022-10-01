import { URL_Config } from '../../../lib/types/config'
import { getComponentMap } from '../../../lib/backend-frontend/get-maps'
import {
	closestBlock,
	getUidFromBlock,
} from '../../../lib/dom/elements-yt-gif-parent'
import { awaitingAtrr } from '../../../lib/dom/attr'
import { TryToUpdateBlock_fmt } from '../../formatter/Flow'
import { getYTUrlObj } from './filter'
import { ValidUrlBtnUsage } from '$v3/init/formatter/button/validation'

export async function OnYtGifUrlBtn(e: MouseEvent, ref: IRefObj, fromObj = {}) {
	// 0.
	const tEl = e.currentTarget as HTMLElement
	const rm_btn = ref.target
	e.stopPropagation()
	e.preventDefault()

	// 1. execute further if the user has valid keys
	const block = closestBlock(rm_btn)!
	const tempUID = getUidFromBlock(block)
	const { url, ytUrlEl } = getYTUrlObj(rm_btn)

	if (!ValidUrlBtnUsage())
		return console.warn('YT GIF Url Button: Invalid Simulation keys')
	if (!tempUID || !url)
		return console.warn(
			`YT GIF Url Button: Couldn't find any url within the block: ((${tempUID}))`
		)

	// 2. protect against spamming clicks
	const awaiting = (bol: b) => {
		//TODO: use to be && comparison
		awaitingAtrr(bol, rm_btn)
		awaitingAtrr(bol, tEl)
	}

	if (rm_btn.hasAttribute('awaiting')) return

	awaiting(true)

	function getSettings(
		e: MouseEvent,
		outterObj: { fmtCmpnt_cb: TFmtCb },
		fromObj: {}
	): TblockUpd_UrlBnt {
		return <const>{
			block,
			targetNode: ytUrlEl,

			siblingSel: `.bp3-icon-video + a[href*="youtu"]`,
			selfSel: `.bp3-icon-video + a[href*="${url}"]`,

			getMap: async () => getComponentMap(tempUID, URL_Config),
			isKey: 'is substring',

			tempUID,

			from: {
				caster: 'rm-btn',
				urlBtn: e.target as El,
				...fromObj,
			},
			...outterObj,
		}
	}

	await TryToUpdateBlock_fmt(getSettings(e, ref, fromObj))

	// 8. set free for any possible future clicks
	awaiting(false)
}
interface IRefObj {
	target: HTMLElement
	fmtCmpnt_cb: TFmtCb
}
