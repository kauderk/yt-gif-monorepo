import {
	FetchText,
	isValidCSSUnit,
	isValidFetch,
	NoCash,
	RemoveElsEventListeners,
} from '$lib/utils'
import { cssData } from '../config/paths'

//#region 1. looks - fetch css html
export async function smart_LoadCSS(cssURL: s, id: s) {
	// 'cssURL' is the stylesheet's URL, i.e. /css/styles.css
	if (!(await isValidFetch(cssURL))) {
		return
	}

	return new Promise(function (resolve: Function, reject) {
		DeleteDOM_Els(id, cssURL)
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = NoCash(cssURL)
		link.id = id
		document.head.appendChild(link)

		link.onload = () => resolve()
	})
}
function DeleteDOM_Els(id: s, cssURL: s) {
	const stylesAlready = document.queryAllasArr(`[id='${id}']`)

	if (stylesAlready?.length > 0) {
		// well well well - we don't like duplicates
		SytleSheetExistAlready(cssURL)
		for (const el of stylesAlready) {
			el.parentElement?.removeChild(el)
		}
	}
}
function SytleSheetExistAlready(id: s) {
	console.log(`The stylesheet ${id} already exist.`)
}
export function smart_CssPlayer_UCS(player_span: s) {
	if (isValidCSSUnit(player_span)) {
		document.documentElement.style.setProperty(
			'--yt-gif-player-span',
			player_span
		)
	}
}
export async function smart_Load_DDM_onTopbar(dropDownMenu: s) {
	// caution:
	const rm_moreIcon = document
		.querySelector('.bp3-icon-more')
		?.closest('.rm-topbar .rm-topbar__spacer-sm + .bp3-popover-wrapper')
	const htmlText =
		window.YT_GIF_OBSERVERS.dmm_html ?? (await FetchText(dropDownMenu))
	const previousList = DDM_Els()
	if (previousList?.length > 0) {
		for (const el of previousList) {
			el.parentElement?.removeChild(el)
		}
		RemoveElsEventListeners(previousList)
	}

	rm_moreIcon?.insertAdjacentHTML('afterend', htmlText)
}
export function DDM_Els() {
	const { ddm_exist } = cssData
	return document.queryAllasArr('.' + ddm_exist)
}
