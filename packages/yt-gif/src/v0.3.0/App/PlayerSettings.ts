export const menu = {
	name: 'Player Settings',
	'data-tooltip': 'Tweak Parameters',
}
export const play_style = <const>{
	label: {
		name: 'Initialize',
		'data-tooltip': 'Play/Pause yt-gifs',
		id: 'Play Style',
	},
	options: {
		strict: {
			'data-tooltip':
				'Strict &amp; Recommended - InAndOutKeys or not, all get muted, except current',
			name: 'Last Active',
			selected: true,
		},
		soft: {
			'data-tooltip':
				'InAndOutKeys have priority. You can play multiple videos with some control.',
			name: 'Hovering',
		},
		all_visible: {
			'data-tooltip': 'Initialized yt-gifs will autoplay indefinitely',
			name: 'Forever',
		},
	},
}
export const mute_style = <const>{
	label: {
		name: 'Mute',
		'data-tooltip': 'Mute/Unmute yt-gifs',
		id: 'Mute Style',
	},
	options: {
		strict: {
			'data-tooltip': 'Maximum of 1 YT GIF plays unmuted at a time',
			name: 'Last Active',
			selected: true,
		},
		soft: {
			'data-tooltip': "Play without sound - 'InAndOutKeys' can unmute it",
			name: 'Hovering',
		},
		all_muted: {
			'data-tooltip': "'InAndOutKeys' won't unmute any yt-gif",
			name: 'Locked',
		},
	},
}
export const fullscreen_style = <const>{
	label: {
		name: 'Fullscreen',
		'data-tooltip': 'While hovering the frame/player/video',
		id: 'fullscreen_style',
	},
	options: {
		disabled: { name: 'Disabled', selected: true },
		mute: { name: 'Mute on exit' },
		pause: { name: 'Pause on exit' },
		play: { name: 'Keep Playing' },
	},
}
export const url_boundaries = <const>{
	label: {
		name: 'Boundaries',
		'data-tooltip': 'Recover parameters after editing blocks',
		id: 'url_boundaries',
	},
	options: {
		strict: {
			'data-tooltip': '&t= has priority over previous timestamp tick',
			name: 'Strict Recovery',
			selected: true,
		},
		soft: {
			'data-tooltip':
				'Remember previous timestamp tick or rely on default',
			name: 'Soft Recovery',
		},
		start_only: {
			'data-tooltip': 'Initialize with &t= start every time',
			name: 'Start only',
		},
	},
}
export const url_volume = <const>{
	label: {
		name: 'Volume',
		'data-tooltip': 'Recover parameters after editing blocks',
		id: 'url_volume',
	},
	options: {
		strict: {
			'data-tooltip':
				'&v= volume has priority over previous volume level',
			name: 'Strict Recovery',
			selected: true,
		},
		soft: {
			'data-tooltip': 'Remember previous volume level or rely on default',
			name: 'Soft Recovery',
		},
		start_only: {
			'data-tooltip':
				'Initialize with &v= volume every time or rely on default',
			name: 'Volume only',
		},
	},
}
