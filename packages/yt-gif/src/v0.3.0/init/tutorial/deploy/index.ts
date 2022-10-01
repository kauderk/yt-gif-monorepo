import { onYouTubePlayerAPIReady } from '$v3/api-ready'
import type { IInput } from './query';
import { Local, FocusOnHover } from './query'

export async function DeployTutorial(parentTarget: El, input: IInput) {
	if (!parentTarget || parentTarget.querySelector('.yt-gif-wrapper')) {
		// video already deployed
		return
	}

	// prettier-ignore
	const tutWrapper = parentTarget.querySelector('[data-video-url]') as HTMLElement;

	// remove every attribute but data-video-url
	Array.from(tutWrapper.attributes)
		.filter(attr => attr.name != 'data-video-url')
		.forEach(attr => tutWrapper.removeAttribute(attr.name))

	const awaitingWrapper = await onYouTubePlayerAPIReady({
		wrapper: tutWrapper,
		targetClass: 'yt-gif-ddm-tutorial',
		dataCreation: 'force-awaiting',
		message: 'testing manual ty gif tutorial',
	})

	const local = Local(input, awaitingWrapper!, parentTarget)
	input.icon.addEventListener('blur', local.blur)

	if (awaitingWrapper) {
		FocusOnHover(awaitingWrapper, input.icon, local)
	}
}
