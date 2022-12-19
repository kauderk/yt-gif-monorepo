import { getOption } from '$v3/lib/backend-frontend/option'
import { UIStore } from '$v3/init/config/UIStore'
import { DeactivateTimestampsInHierarchy } from '$v3/init/timestamp/hierarchy'
import { closest_anchor_container } from '$v3/lib/dom/elements-yt-gif-parent'
import { TryToRecoverTimestamps } from './flow'
import type { TMutationObj } from './mutation'

// -------------------
export function TrySetUpTimestampRecovery(
	that: ILocalWrapper,
	rm_container: El
) {
	if (
		!rm_container ||
		rm_container?.hasAttribute('data-timestamp-observer')
	) {
		return <const>{
			getCrrContainer: () => rm_container!,
			switchTimestampObsOnAchor: (e: Event) => {},
		}
	}
	const { delObsTimestmp, getTargetWrapper, getObsTimestamp } = that

	rm_container.setAttribute('data-timestamp-observer', '')
	rm_container.addEventListener('customDelObsTimestmp', delObsTimestmp)

	// @ts-ignore
	const arr: TMutArr = [getObsTimestamp()]
	// prettier-ignore
	const MutationObj: TMutationObj = { removed: arr, lastActive: arr };
	let awaiting = false

	const observer = new MutationObserver(async mutationsList => {
		if (
			awaiting ||
			!UIStore.get().display.simulate_roam_research_timestamps.checked
		)
			return

		awaiting = true

		await TryToRecoverTimestamps(that, mutationsList, MutationObj)

		awaiting = false
	})

	const config = { attributes: true, childList: true, subtree: true }
	const anchor_opt = getOption(UIStore.get().timestamps.tm_options, 'anchor')
	const target = getTarget2Observer(anchor_opt.selected)

	let getCrrContainer = () => target
	observer.observe(target, config)

	const switchTimestampObsOnAchor = (e: Event) => {
		//@ts-ignore
		const bol: b = e.target.selected

		DeactivateTimestampsInHierarchy(
			getTarget2Observer(true),
			getTargetWrapper()
		)
		getTarget2Observer(!bol)?.removeEventListener(
			'customDelObsTimestmp',
			delObsTimestmp
		)

		observer.disconnect() // self or anchor?

		const target = getTarget2Observer(bol)

		target.addEventListener('customDelObsTimestmp', delObsTimestmp)
		observer.observe(target, config)

		getCrrContainer = () => target
	}

	anchor_opt.addEventListener('customChange', switchTimestampObsOnAchor)

	function getTarget2Observer(bol: b) {
		return !bol
			? rm_container
			: closest_anchor_container(rm_container) ?? rm_container
	}
	return <const>{
		getCrrContainer,
		switchTimestampObsOnAchor,
	}
}
