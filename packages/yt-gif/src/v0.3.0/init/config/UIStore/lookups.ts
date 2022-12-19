export {
	awaiting_input_type,
	initialize_mode,
	initialize_modeOptions,
} from '$v3/App/Experience'
export {
	formatterOptions,
	options,
	yt_playback_speed,
} from '$v3/App/Miscellaneous'
export {
	fullscreen_style,
	mute_style,
	play_style,
	url_boundaries,
	url_volume,
} from '$v3/App/PlayerSettings'
export {
	displayTm,
	grabTm,
	LoopOptions,
	loopTimestamps,
	reset,
	restore,
	seekTo,
	seekToActions,
	startEndOptions,
	featuresOptions,
} from '$v3/App/Timestamps'

export const ps_options = <const>{
	id: 'ps_options',
	options: {
		mantain_last_active_player: {
			name: 'mantain_last_active_player',
			'data-tooltip': 'Unknown behavior',
			selected: true,
		},
		minimize_on_video_ended: {
			name: 'minimize_on_video_ended',
			'data-tooltip': `Unknown behavior`,
		},
	},
}
