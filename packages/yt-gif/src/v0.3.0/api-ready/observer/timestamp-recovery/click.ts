import { HMSToSecondsOnly, sleep } from '$lib/utils'
import { UIStore } from '$v3/init/config/UIStore'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import { TryToRecoverActiveTimestamp } from './flow/query'

export async function AssertParamsClickTimestamp(
	// prettier-ignore
	{ getCrrContainer, getObsTimestamp }: Pick<ILocalWrapper, 'getCrrContainer' | 'getObsTimestamp'>,
	configParams: IExtendedVideoParams
) {
	const lastActive = getObsTimestamp()
	if (
		!UIStore.get().display.simulate_roam_research_timestamps.checked ||
		!UIStore.get().timestamps.tm_recovery.checked ||
		!lastActive
	) {
		return
	}
	await TryToRecoverActiveTimestamp(getCrrContainer, lastActive)
	await sleep(10)

	const tryActiveTm = (p: startEnd) =>
		configParams[p].set(crr => {
			const tm = TryGetTimestampAttr(getCrrContainer, p)
			return HMSToSecondsOnly(tm) || crr
		})

	tryActiveTm('start')
	tryActiveTm('end')
}
function TryGetTimestampAttr(
	getCrrContainer: ILocalWrapper['getCrrContainer'],
	page: startEnd
) {
	return (
		getCrrContainer()
			?.querySelector(
				`.rm-video-timestamp[timestamp-style="${page}"][active-timestamp]`
			)
			?.getAttribute('timestamp') || ''
	)
}
