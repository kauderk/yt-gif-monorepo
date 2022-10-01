import { navigateToUiOrCreate } from '$lib/utils-roam-alpha-api'
import { isElementVisible, sleep } from '$lib/utils'
import type { TLastWrapper } from '$v3/init/observer/timestamp/click/types'

export async function TryGoToBlockPage({
	WrappersInBlock,
	crossRoot,
	f_uid,
	root,
	mainRoot,
}: TLastWrapper) {
	if (WrappersInBlock(crossRoot).length == 0) {
		// 0 instances on crossRoot
		await navigateToUiOrCreate(f_uid, root == mainRoot, 'block')
	}
}
export async function SleepIfRendered({
	lastWrapperInBlock,
	crossRoot,
}: TLastWrapper) {
	const prevWrapper = lastWrapperInBlock(crossRoot) as HTMLElement
	const isRendered =
		prevWrapper instanceof Element && isElementVisible(prevWrapper)
	await sleep(isRendered ? 50 : 500) // visible? then quicker
}
