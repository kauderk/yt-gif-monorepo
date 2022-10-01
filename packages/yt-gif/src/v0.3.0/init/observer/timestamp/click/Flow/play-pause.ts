import { simHoverOut, simHover } from '$lib/utils'
import type { PulseObj } from '$v3/init/timestamp/lib'

export function TogglePlayAttr_SimHover1(
	pulse: ReturnType<typeof PulseObj>,
	lastWrapper: QrySearch
) {
	pulse('blueViolet')
	const iframe = lastWrapper?.querySelector('iframe')

	if (iframe?.hasAttribute('yt-playing')) {
		// pepega
		lastWrapper?.dispatchEvent(simHoverOut())
	}

	// hover out -> videoIsPlayingWithSound(false)
	else if (iframe) {
		lastWrapper?.dispatchEvent(simHover())
	}
}
