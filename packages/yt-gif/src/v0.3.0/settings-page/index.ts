import {
	SetNumberedViewWithUid,
	CollapseDirectcChildren,
} from '$lib/utils-roam-alpha-api'
import { YT_GIF_SETTINGS_PAGE } from './shape'
import { pageShape2BlockMap } from './key-block-map'
import { CreateMissingBLocks } from './block-creation'
import { Read_Write_SettingsPage } from './read-warite'
import { TARGET_UID, TryToSetTargetUID } from './keys'

// window.YT_GIF_SETTINGS_PAGE_INIT = async () => await init()
// window.YT_GIF_SETTINGS_PAGE = <typeof YT_GIF_SETTINGS_PAGE>{}
window.YT_GIF_DIRECT_SETTINGS = new Map()

export async function init() {
	const res = await pageShape2BlockMap(YT_GIF_SETTINGS_PAGE)

	if (!TARGET_UID) {
		// Brand new installation
		await TryToSetTargetUID()
		await CreateMissingBLocks(res.page) // 🐌
		await SetNumberedViewWithUid(TARGET_UID)
		await CollapseDirectcChildren(TARGET_UID, false)
	} // Read and store Session Values
	else {
		// prettier-ignore
		const pendingBLocks2Displace = await Read_Write_SettingsPage(TARGET_UID, res.keyObjMap) // 🐌
		await CreateMissingBLocks(res.page) // 🐌 // THEY WILL STACK UP AGAINS EACHOTHER IF THEY ARE NOT EXAMINED - careful, bud
		for (const cb_closure of pendingBLocks2Displace) //
			await cb_closure()
	}
	window.YT_GIF_DIRECT_SETTINGS = res.keyObjMap
	return res.page
}
