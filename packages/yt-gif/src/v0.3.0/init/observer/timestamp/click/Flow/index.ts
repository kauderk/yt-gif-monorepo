import { setSideBarState } from '$lib/utils-roam-alpha-api'
import type { PulseObj } from '../../../../timestamp/lib'
import { ToggleBoundarySet1 } from '../simulation'
import { TogglePlayAttr_SimHover1 as DispatchPlayPause } from './play-pause'
import { tryPlayLastBlock } from './play'
import { tryGetRecordBoundary } from '../record/record'
import { TryGetValidTimestamp } from '../record/query'
import type { IClickInput } from '$v3/init/observer/timestamp/types'
import type { TLastWrapper } from '$v3/init/observer/timestamp/click/types'
import { TryGoToBlockPage, SleepIfRendered } from './cross-page'
import { sleep } from '$lib/utils'

export function Local(
	pulse: ReturnType<typeof PulseObj>,
	evt: ReturnType<typeof Event>,
	last: TLastWrapper,
	input: IClickInput
) {
	const { lastWrapperInBlock } = last
	async function tryPlayLastBlock_SimHover(r: s) {
		await tryPlayLastBlock({
			pulse,
			boundaryObj: getBoundaryObj(r),
			...evt.detail,
		})
		// 6.
		if (evt.ScrollKey()) {
			ScrollToTargetWrapper(r)
		}
	}
	function ScrollToTargetWrapper(r: s) {
		lastWrapperInBlock(r)?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'nearest',
		})
	}
	function getBoundaryObj(r: s) {
		return tryGetRecordBoundary(
			lastWrapperInBlock(r),
			TryGetValidTimestamp(evt.tEl),
			last.f_uid,
			ToggleBoundarySet,
			input.tmSetObj
		)
	}

	function TryToDeactivateSet() {
		pulse('red')
		ToggleBoundarySet(false, lastWrapperInBlock(last.root))
	}
	function ToggleBoundarySet(bol: b, targetWrapper: QrySearch) {
		ToggleBoundarySet1(bol, input.tmSetObj, targetWrapper)
	}

	async function PlayPause_SimHover(r: s) {
		DispatchPlayPause(pulse, lastWrapperInBlock(r))
	}

	async function OpenBlockOnCrossRoot() {
		await setSideBarState(3)
		await sleep(50)
		pulse('blue')
		await TryGoToBlockPage(last)
		await SleepIfRendered(last)
		ScrollToTargetWrapper(last.crossRoot)
		await tryPlayLastBlock_SimHover(last.crossRoot)
	}

	return <const>{
		tryPlayLastBlock_SimHover,
		PlayPause_SimHover,
		OpenBlockOnCrossRoot,
		TryToDeactivateSet,
	}
}
export function Event(e: T_TmClickDetailEvent) {
	const { currentTarget: tEl } = e

	return <const>{
		tEl,
		resolve: () => tEl.removeAttribute('awaiting'),
		isPending: () => tEl.hasAttribute('awaiting'),
		pending: () => tEl.setAttribute('awaiting', 'true'),
		ScrollKey: () => e['ctrlKey'],
		detail: typeof e.detail == 'object' ? e.detail : e,
	}
}
