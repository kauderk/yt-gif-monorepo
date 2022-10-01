import { ClickOnTimestamp } from '$v3/lib/event/ClickOnTimestamp'
import { ElementsPerBlock } from '$v3/lib/dom/ytgif'
import type { T_tmRecord } from '../mutation'
import { sleep } from '$lib/utils'

export function TryToSetLastActiveTimestamp(
	setObsTimestamp: ILocalWrapper['setObsTimestamp'],
	lastActive: T_tmRecord[]
) {
	const lastActiveTimestamp = lastActive.find(
		aO => aO?.target?.timestamp && aO.blockID
	)
	setObsTimestamp(lastActiveTimestamp as TlastActiveTm['lastActiveTimestamp'])
}

export async function TryToRecoverActiveTimestamp(
	getCrrContainer: ILocalWrapper['getCrrContainer'],
	commonObj: TlastActiveTm['lastActiveTimestamp'] | null,
	assign2ClickEvent = <TClickEventOverride>{}
) {
	if (!commonObj) {
		console.warn('Passed null common object')
		return
	}

	await sleep(10)
	const rm_container = getCrrContainer()

	const children = (sel: s, self?: b) =>
		!self
			? rm_container?.queryAllasArr(sel)
			: [rm_container, ...rm_container?.queryAllasArr(sel)]

	// const active_rm_container = atIndex(children('.roam-block-container', true), commonObj.containerIndex);
	let active_block = children('.roam-block')[commonObj.blockIndex]

	const block = document.getElementById(commonObj.blockID) as El
	if (block != active_block && commonObj.workflow == 'strict') {
		if (!rm_container.contains(block)) {
			return
		}
		active_block = block // Hmmm...
	}

	const timestamps =
		ElementsPerBlock(active_block, '[yt-gif-timestamp-emulation]') || []
	const targetTimestamp =
		timestamps[commonObj.target.index] ||
		timestamps[commonObj.start.index] ||
		timestamps[commonObj.end.index] ||
		timestamps[timestamps.length - 1]

	await ClickOnTimestamp(targetTimestamp as IBtn, assign2ClickEvent)
}
