import { getUrlMap_smart } from '$v3/lib/backend-frontend/get-maps'
import { TryToUpdateBlock_fmt } from '$v3/init/formatter/Flow'

export async function OnYtGifUrlBtn(
	e: Event,
	fmtCmpnt_cb: TFmtCb,
	instance: IInstance
) {
	e.preventDefault()
	e.stopPropagation()

	await TryToUpdateBlock_fmt(settings(e, fmtCmpnt_cb, instance, {}))
}
export async function OnYtGifInsertBtn(
	e: Event,
	fmtCmpnt_cb: TFmtCb,
	instance: IInstance,
	fromObj = {}
) {
	e.preventDefault()
	e.stopPropagation()

	// ugly code :x
	await TryToUpdateBlock_fmt(settings(e, fmtCmpnt_cb, instance, fromObj))
}
export interface IInstance {
	grandParentBlock: El
	wrapper: El
	url: s
	uid: s
}
function settings(
	e: Event,
	fmtCmpnt_cb: TFmtCb,
	instance: IInstance,
	fromObj = {}
): TblockUpd_UrlBnt {
	return <const>{
		block: instance.grandParentBlock,
		targetNode: instance.wrapper,

		siblingSel: '.yt-gif-wrapper',
		selfSel: `[data-video-url="${instance.url}"]`,

		getMap: async () => getUrlMap_smart(instance.uid),
		isKey: 'is component',

		tempUID: instance.uid,

		from: {
			caster: 'player',
			page: 'yt-gif',
			urlBtn: e.target as El,
			...fromObj,
		},
		fmtCmpnt_cb,
	}
}
