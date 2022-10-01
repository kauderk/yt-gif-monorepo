import { toggleClasses } from '$lib/utils'

export function PulseObj(tEl: Element) {
	const base = ['yt-timestamp-pulse-text-anim']
	const animations = {
		green: [...base, 'yt-timestamp-success'],
		red: [...base, 'yt-timestamp-warn'],
		blue: [...base, 'yt-timestamp-opening'],
		purple: [...base, 'yt-timestamp-reset'],
		blueViolet: [...base, 'yt-timestamp-pause'],
		all: Array<string>(),
	}

	animations['all'] = Object.values(animations)
		.flat(Infinity)
		.filter((v, i, a) => a.indexOf(v) === i) as Array<string>

	function pulse(anim: keyof typeof animations = 'green') {
		toggleClasses(false, animations['all'], tEl)
		toggleClasses(true, animations[anim], tEl)
		setTimeout(() => toggleClasses(false, animations[anim], tEl), 500)
	}

	return pulse
}
