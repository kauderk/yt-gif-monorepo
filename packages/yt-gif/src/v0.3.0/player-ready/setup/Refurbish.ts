import { lastBlockIDParameters } from '$v3/lib/types/config'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import { setupPreviousParams } from './setupPreviousParams'
import { TryFreezeAutoplay } from '../finished/autoplay-flow'
import { TryToRunPreviousParams } from '../finished/query'
import type { TQueryResult } from './GetQuery'
import type { ILocal } from '../lib/TStat'

export async function Refurbish(
	local: ILocal,
	t: YT_TargetWrapper,
	q: TQueryResult,
	iframe: IFR
) {
	const session = lastBlockIDParameters.get(local.entry.blockID)
	if (session) {
		session.updateTime.set(t.ytgif.previousTick)
	}
	setupPreviousParams(local, q) // The YT API reloads the iframe onload, it disorients the users, this a counter-measurement
	await TryFreezeAutoplay(iframe, t, q)
	//TryToRunPreviousParams(t, local)
}
