import { isNotZoomPath } from '$lib/utils'
import { attrInfo } from '../../config/paths'
import { onYouTubePlayerAPIReady } from '$v3/api-ready'

export function Local(targetClass: s) {
	// ObserveIntersectToSetUpPlayer when cssClass is added to the DOM
	return {
		async OnRendered(wrapper: Element) {
			window.YT_GIF_OBSERVERS.masterIntersectionObservers.push(
				PlayerOnIntersection({
					wrapper,
					message: 'valid entries MutationObserver',
					targetClass
				})
			)
		},
		validTemplates() {
			//AvoidAllZoomChildren
			return document
				.queryAllasArr('.' + targetClass)
				.filter(el => isNotZoomPath(el)) as HTMLElement[]
		}
	}
}
export function DeployPlayer({ wrapper, targetClass, message }: IReadyInput) {
	onYouTubePlayerAPIReady({
		wrapper: wrapper as HTMLElement,
		targetClass,
		dataCreation: wrapper.getAttribute(attrInfo.creation.name)!,
		message: message || 'YScrollerObserver'
	})
}
export function PlayerOnIntersection(input: IReadyInput) {
	const yobs = new IntersectionObserver(
		entries => {
			if (!entries[0]) yobs.disconnect()

			for (const entry of entries)
				if (entry.isIntersecting) {
					DeployPlayer(input)
					yobs.disconnect()
					break
				}
		},
		{
			threshold: [0]
		}
	)

	yobs.observe(input.wrapper)

	return yobs
}
interface IReadyInput {
	wrapper: Element
	targetClass: string
	message?: string
}
