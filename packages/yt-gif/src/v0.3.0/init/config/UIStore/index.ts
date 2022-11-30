import { createWritableStore } from '$lib/local-storage-store'
import * as l from './lookups'
import {
	createInputStore,
	createSelectStore,
	createCustomSelectStore,
} from './proxy'

const SelectStore = (o: { options: o }) =>
	// typescript!!!
	createSelectStore(o)

export const UIStore = createWritableStore('UIStore', {
	defaultPlayerValues: {
		player_captions_language: 'en',
		player_captions_on_load: 'true',
		player_interface_language: 'en',
		player_span: '50%',
		player_volume: 0,
	},
	defaultValues: {
		InAndOutKeys: 'ctrlKey,altKey',
		YT_API_KEY_V3: '',
		end_loop_sound_src:
			'https://freesound.org/data/previews/256/256113_3263906-lq.mp3',
		override_roam_video_component: '',
		override_simulate_url_to_video_component: '',
	},
	deploymentStyle: {
		deploy_yt_gifs: createInputStore(),
		deployment_style_both: createInputStore(),
		deployment_style_video: createInputStore(),
		deployment_style_yt_gif: createInputStore(),
		suspend_yt_gif_deployment: createInputStore(),
	},
	display: {
		fmt_options: SelectStore(l.formatterOptions),
		ms_options: createCustomSelectStore(l.options, ['multiple', 'custom']),
		simulate_roam_research_timestamps: createInputStore(),
		yt_playback_speed: SelectStore(l.yt_playback_speed),
	},
	dropdownMenu: {
		ddm_css_theme_input: createInputStore(),
	},
	experience: {
		awaiting_input_type: SelectStore(l.awaiting_input_type),
		initialize_mode: SelectStore(l.initialize_mode),
		xp_options: SelectStore(l.initialize_modeOptions),
	},
	playerSettings: {
		fullscreen_style: SelectStore(l.fullscreen_style),
		mute_style: SelectStore(l.mute_style),
		play_style: SelectStore(l.play_style),
		ps_options: SelectStore(l.ps_options),
		url_boundaries: SelectStore(l.url_boundaries),
		url_volume: SelectStore(l.url_volume),
	},
	range: {
		end_loop_sound_volume: createInputStore(),
		iframe_buffer_slider: createInputStore(),
		timestamp_display_scroll_offset: createInputStore(),
	},
	timestamps: {
		tm_loop_hierarchy: SelectStore(l.loopTimestamps),
		tm_loop_options: SelectStore(l.LoopOptions),
		tm_loop_to: SelectStore(l.startEndOptions),
		tm_options: SelectStore(l.featuresOptions),
		tm_recovery: createInputStore(),
		tm_reset_on_removal: SelectStore(l.reset),
		tm_restore: SelectStore(l.restore),
		tm_seek_action: SelectStore(l.seekToActions),
		tm_seek_to: SelectStore(l.seekTo),
		tm_workflow_display: SelectStore(l.displayTm),
		tm_workflow_grab: SelectStore(l.grabTm),
	},
})
