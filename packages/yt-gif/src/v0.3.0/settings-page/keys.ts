import { getPageUidSync, getOrCreatePageUid } from '$lib/utils-roam-alpha-api'

export const TARGET_PAGE = 'roam/js/kauderk/yt-gif/settings'
export let TARGET_UID = getPageUidSync(TARGET_PAGE)
export async function TryToSetTargetUID() {
	TARGET_UID = await getOrCreatePageUid(TARGET_PAGE)
}
