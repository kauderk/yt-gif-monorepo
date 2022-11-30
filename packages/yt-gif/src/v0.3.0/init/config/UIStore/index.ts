import { createWritableStore } from '$lib/local-storage-store'
import {
	createInputStore,
	createSelectStore,
	createCustomSelectStore,
} from './proxy'

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
		fmt_options: createSelectStore(),
		ms_options: createCustomSelectStore(
			['simulate_url_formatter'],
			['multiple', 'custom']
		),
		simulate_roam_research_timestamps: createInputStore(),
		yt_playback_speed: createSelectStore(),
	},
	dropdownMenu: {
		ddm_css_theme_input: createInputStore(),
	},
	experience: {
		awaiting_input_type: createSelectStore(),
		initialize_mode: createSelectStore(),
		xp_options: createSelectStore(),
	},
	playerSettings: {
		fullscreen_style: createSelectStore(),
		mute_style: createSelectStore(),
		play_style: createSelectStore(),
		ps_options: createSelectStore(),
		url_boundaries: createSelectStore(),
		url_volume: createSelectStore(),
	},
	range: {
		end_loop_sound_volume: createInputStore(),
		iframe_buffer_slider: createInputStore(),
		timestamp_display_scroll_offset: createInputStore(),
	},
	timestamps: {
		tm_loop_hierarchy: createSelectStore(),
		tm_loop_options: createSelectStore(),
		tm_loop_to: createSelectStore(),
		tm_options: createSelectStore(['anchor', 'shortcuts']),
		tm_recovery: createInputStore(),
		tm_reset_on_removal: createSelectStore(),
		tm_restore: createSelectStore(),
		tm_seek_action: createSelectStore(),
		tm_seek_to: createSelectStore(),
		tm_workflow_display: createSelectStore(),
		tm_workflow_grab: createSelectStore(),
	},
})
