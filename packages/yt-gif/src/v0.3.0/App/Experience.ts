export const awaiting_input_type = {
	label: {
		name: 'Input Type',
		'data-tooltip': "Don't load until interaction",
		id: 'awaiting_input_type',
	},
	options: {
		mousedown: { name: 'Clicks' },
		mouseenter: { name: 'Hovering' },
	},
}
export const initialize_mode = <const>{
	label: {
		name: 'Mode',
		id: 'initialize_mode',
	},
	options: {
		input_x_buffer: {
			name: 'Buffer + Interaction',
			'data-tooltip':
				'Create a stack, push and shift at will - Performance Mode ⚡️',
			selected: true,
		},
		input: {
			name: 'Awaiting for Inputs',
			'data-tooltip': "Don't load until interaction",
		},
		overflow: {
			name: 'Handle Overflow',
			'data-tooltip':
				'Set Automatically - To gain access to the buffer, either increase the limit or manually unload videos',
			//disabled: true,
		},
		disabled: {
			name: 'Everything',
			'data-tooltip': 'As soon as any "yt-gif" component gets rendered',
		},
	},
}
export const initialize_modeOptions = {
	id: 'xp_options' as const,
	options: {
		thumbnail: <const>{
			name: 'Video Thumbnail',
			'data-tooltip': 'Aesthetics - or - minimalism',
			selected: true,
		},
		try_to_load_when_rendered: {
			name: 'Try To Load When Rendered' as const,
			'data-tooltip':
				'Newly observed components will try to displace the oldest ones' as const,
			hide: false,
		},
	},
}
export const menu = <const>{
	name: 'Experience',
	'data-tooltip': 'Quality of life Features',
}
export const tuts = <const>{
	hide: { name: 'Hide' },
	_96XDmFPzbU: {
		name: 'Iframe Buffer',
		'data-tooltip': 'YT GIFs as iframes and garbage collection',
	},
}
