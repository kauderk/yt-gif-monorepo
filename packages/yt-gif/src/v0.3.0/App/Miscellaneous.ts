export const menu = <const>{
	name: 'Miscellaneous',
	'data-tooltip': 'Formatters and Visuals',
}
export const yt_playback_speed = <const>{
	label: {
		name: 'Playback Speed',
		'data-tooltip': 'Override all yt-gifs',
		id: 'yt_playback_speed',
	},
	options: {
		Default: { name: 'Default', selected: true },
		'2': { name: '2x' },
		'1.75': { name: '1.75x' },
		'1.5': { name: '1.5x' },
		'1': { name: '1x' },
		'0.75': { name: '0.75x' },
		'0.5': { name: '0.5x' },
		'0.25': { name: '0.25x' },
	},
}
export const timestamp_display_scroll_offset = <const>{
	attr: {
		min: 1,
		max: 30,
		value: 15,
		id: 'timestamp_display_scroll_offset',
		'data-tooltip':
			'The greater the slider, the less tries, the less loadings :D - Recomended 5-10',
	},
	counter: {
		'data-tooltip': 'From 1 to 30 - Loaded Simultaneously',
	},
}
export type TRange = {
	attr: {
		min: number
		max: number
		value: number
		id: string
		'data-tooltip': StrSearch
	}
	counter: {
		'data-tooltip': string
	}
}
export type TLabel = {
	name: s
	'data-tooltip': s
}
export const iframe_buffer_slider = <const>{
	label: {
		name: 'Time offset on scroll wheel',
		'data-tooltip':
			'Go back on forward when scrolling inside the timestamp display',
	},
	range: {
		attr: {
			min: 1,
			max: 60,
			value: 5,
			id: 'iframe_buffer_slider',
			'data-tooltip': <StrSearch>undefined,
		},
		counter: {
			'data-tooltip': 'From 1 to 60 - Seconds',
		},
	},
}
export const end_loop_sound_volume = <const>{
	label: {
		name: 'Sound on video end/loop',
		'data-tooltip': 'Reminds you that the clip has ended',
	},
	range: {
		attr: {
			min: 0,
			max: 100,
			value: 40,
			id: 'end_loop_sound_volume',
			'data-tooltip': undefined,
		},
		counter: {
			'data-tooltip': 'From 0 to 100',
		},
	},
}
//--------------------------------
export const options = <const>{
	id: 'ms_options',
	options: {
		clip_lifespan_format: {
			name: 'Clip lifespan format',
			'data-tooltip': 'Clip duration or relative to entire video',
			selected: true,
		},
		simulate_url_formatter: {
			name: 'Simulate URL formatter',
			'data-tooltip': `Click on the button next to a youtube video url and create it's {{[[yt-gif]]}} component`,
		},
	},
}
export const formatterOptions = <const>{
	id: 'fmt_options',
	row: true,
	options: {
		avoid_redundancy: {
			name: 'Unique',
			'data-tooltip':
				'Strip down redundant variables when formatting to components',
			icon: 'bp3-icon-annotation',
			selected: true,
		},
		lift_pears: {
			name: 'Pears',
			'data-tooltip':
				"For Timestamp Sets: Lift/remove pear, then hide/append it's content within format target",
			icon: 'bp3-icon-link',
			selected: true,
		},
		rely_on_hierarchy: {
			name: 'Hierarchy',
			'data-tooltip':
				"For Timestamps: Rely on {{yt-gif}} or {{yt-gif/anchor}} to perform operations + don't write redundant url",
			icon: 'bp3-icon-diagram-tree',
			selected: true,
		},
	},
}
export const tuts = <const>{
	hide: { name: 'Hide' },
	Ih_Tt3MkaaM: {
		name: 'URL Formatter',
		'data-tooltip': 'Conversion between video, timestamps and urls',
	},
	'1ABtb346pc0': {
		name: 'Video Controls',
		'data-tooltip': 'Custom YT GIF video controls',
	},
}
