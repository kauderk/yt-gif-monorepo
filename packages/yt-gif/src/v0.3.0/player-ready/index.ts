import { closestYTGIFparentID } from '$v3/lib/dom/elements-yt-gif-parent'
import { allVideoParameters, recordedIDs } from '$v3/lib/types/config'
import {
	closestBlockID,
	RemovedElementObserver,
	getUniqueSelectorSmart,
} from '$lib/utils'
import { PushNew_ShiftAllOlder_IframeBuffer } from '$v3/init/observer/performance'
import { ValidateHierarchyTimestamps } from '$v3/init/timestamp/hierarchy'
import type { YT_IFRAME as YT } from '$v3/lib/types/yt-types'
import { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import { GetHoverStates } from './listener/parent/in-out-states'
import { setupPreviousParams } from './setup/setupPreviousParams'
import { FlipStyleGenerator, GetStyleCallbacks } from './listener/toggle'
import { TimeTargetObj } from './listener/control/time/ClearTimers'
import { GetFuncResetBoundaries } from './listener/control/reset-btn/OnCustomVideoEnded'
import { GetOnIframeRemovedFromDom } from './observer/IframeRemmovedFromDom_callback'
import { GetFuncPauseOffscreen } from './observer/PauseOffscreen_callback'
import { TryFreezeAutoplay, AutoPlayToUpdate } from './finished/autoplay-flow'
import { TryToRunPreviousParams } from './finished/query'
import { GetQuery } from './setup/GetQuery'
import { TrySetupRecordID } from './setup/SetupRecordID'
import type { TStat, ILocal } from './lib/TStat'
import { Refurbish } from './setup/Refurbish'
import type { TQueryElements } from './setup/GetElements'
import { GetElementsObj } from './setup/GetElements'
import { GetFullscreenCallbacks } from '$v3/player-ready/listener/iframe/fullscreen'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'

export async function onPlayerReady(event: YT) {
	// setup
	const t = new YT_TargetWrapper(event.target)
	const key = t.GetIframeID()
	const l = GetElementsObj(key, t)
	const { iframe, parent /* timeDisplay, resetBtn */ } = l

	const map = allVideoParameters.get(key)!
	map.start.set(map.start.value || 0)
	map.end.set(map.end.value || t.getDuration())

	const local = GetLocalObj(map, l, iframe)
	const q = GetQuery({
		map,
		parent,
		//timeDisplay,
		t,
		iframe,
		local,
	})

	map.speed.set(q.closestRate(map.speed.value || 1))

	TrySetupRecordID(recordedIDs.get(local.entry.blockID), t, q)

	const styleCallbacks = GetStyleCallbacks(iframe, q, t, map, local)

	if (parent.hasAttribute('loaded')) {
		await Refurbish(local, t, q, iframe)
		TryToRunPreviousParams(t, local, styleCallbacks)
		return
	}

	iframe.removeAttribute('title')

	// 1. previous parameters if available
	setupPreviousParams(local, q)

	// 2. play style | pause style
	// const flipIterator = FlipStyleGenerator(styleCallbacks)
	// flipIterator.next()

	// 3. Mouse over the frame functionality
	const hover = GetHoverStates(q)
	parent.addEventListener('mouseenter', hover.play)
	parent.addEventListener('mouseleave', hover.stop as EventListener)
	// parent.addEventListener(
	// 	'customVideoEnded',
	// 	q.timeDisplay.OnCustomVideoEnded
	// )

	// 4. scroll wheel - timestamp display feature
	// const time = TimeTargetObj(q, iframe, map, local, t, l)
	// t.ytgif.enter = time.NewIntervalUpdate
	// timeDisplay.addEventListener('wheel', time.SeekToScroll)
	// timeDisplay.addEventListener('mouseenter', time.NewIntervalUpdate)
	// timeDisplay.addEventListener('mouseleave', () => t.ytgif.ClearTimers())

	// 5. fullscreenStyle
	// const fullscreen = GetFullscreenCallbacks(q, t)
	// iframe.addEventListener('fullscreenchange', fullscreen.default)
	// iframe.addEventListener('fullscreenchange', fullscreen.autoplaySynergy)

	// 6. Reload boundaries
	// const ResetBoundaries = GetFuncResetBoundaries(t, q, l, map, time, local)
	// resetBtn.addEventListener('click', ResetBoundaries)
	// resetBtn.ResetBoundaries_smart = ResetBoundaries

	// 7. store relevant elements with event event listeners to clean them later
	// 8. clean data and ready 'previous' parameters for next session with IframeRemovedFromDom_callback
	// Expensive? think so. Elegant? no, but works
	// RemovedElementObserver({
	// 	el: iframe as IFRH,
	// 	OnRemovedFromDom_cb: GetOnIframeRemovedFromDom(
	// 		flipIterator,
	// 		t,
	// 		q,
	// 		map,
	// 		local.entry,
	// 		l
	// 	),
	// })

	// 9. Performance Mode - Iframe Buffer & Initialize on interaction - synergy
	// if (local.entry.canBeCleanedByBuffer && parent) {
	// 	// sometimes the parent is already gone - while loading iframe
	// 	const parentCssPath = getUniqueSelectorSmart(parent)
	// 	PushNew_ShiftAllOlder_IframeBuffer(parentCssPath)
	// }

	// 10. 'auto pause' when an iframe goes out the viewport... stop playing and mute
	// FIXME:
	// const ViewportObserver = new IntersectionObserver(
	// 	GetFuncPauseOffscreen(q, t, local),
	// 	{ threshold: [0] }
	// )
	// ViewportObserver.observe(iframe)

	// 11. well well well
	if (map.playRightAway?.value && map.hasOwnProperty('updateTime')) {
		await AutoPlayToUpdate(iframe, t, q, map)
	} else {
		// pause if user doesn't intents to watch
		await TryFreezeAutoplay(iframe, t, q) // this being the last one, does matter
	}

	// 12. Guard clause - onPlayerReady executed
	TryToRunPreviousParams(t, local, styleCallbacks)
	parent.setAttribute('loaded', '')
	iframe.addEventListener('load', () => (t.ytgif.previousTick = q.tick()))
	//ValidateHierarchyTimestamps(parent, t)
}
function GetLocalObj(
	map: IExtendedVideoParams,
	l: TQueryElements,
	iframe: Element
) {
	const stats: TStat = {
		start: map.start.value,
		volume: map.volume.value,
		end: map.end.value,
	}
	const local: ILocal = {
		entry: {
			...stats,
			blockID: l.blockID,
			blcokID_prfx: closestYTGIFparentID(iframe),
			canBeCleanedByBuffer: !!closestBlockID(iframe),
			key: iframe.id,
		},
		update: { ...stats, tickOffset: 0 },
	}
	return local
}
