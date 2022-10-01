import { chk, sel, rng, int, str, bol, url } from './types'
import {
	BasePmt,
	InlinePmt,
	BaseSetting,
	BaseDom,
	BaseInitSetting,
	dom,
} from './block-types'

/**
 * @summary YT_GIF_SETTINGS_PAGE
 * @type Object
 * @description Actual user settings
 */

export const YT_GIF_SETTINGS_PAGE = {
	Workflow: {
		baseKey: BasePmt(`BIP BOP . . .`),
		joins: InlinePmt(
			`either "ﾠ:ﾠ" for actual settings or "ﾠ/ﾠ" for prompt guidelines`
		),
		parameters: {
			baseKey: BasePmt(
				'\n`(xxxuidxxx)` : `yt_gif_settings_key` : `<value>`'
			),
			uid: InlinePmt(
				"\n`(xxxuidxxx)`\nunique per user data base, without it the settings can't be written on this page"
			),
			key: InlinePmt(
				'\n`yt_gif_settings_key`\nsecond way to know which setting to change'
			),
			value: InlinePmt(
				'\n`<value>`\nin many cases optional and most of the time a binary switch, on - off'
			),
		},
		//reach: InlinePmt(`Blocks below "LogStatus" will be ignored`),
	},
	display: {
		baseKey: BaseSetting(chk),
		simulate_roam_research_timestamps: dom(),
		ms_options: dom('clip_lifespan_format', sel),
		fmt_options: dom('avoid_redundancy', sel),
		yt_playback_speed: dom('Default', sel),
	},

	timestamps: {
		baseKey: BaseSetting(sel),
		tm_recovery: dom('1', chk),
		tm_seek_to: dom('strict'),
		tm_restore: dom('match'),
		tm_reset_on_removal: dom('container'),

		tm_loop_hierarchy: dom('disabled'),
		tm_loop_to: dom('start'),
		tm_loop_options: dom('skip,include_player'),
		tm_seek_action: dom('disabled'),

		tm_workflow_display: dom('default'),
		tm_workflow_grab: dom('HMS'),
		tm_options: dom(''),
	},

	experience: {
		baseKey: BaseSetting(sel),

		initialize_mode: dom('buffer'),
		awaiting_input_type: dom('mouseenter'),
		xp_options: dom('thumbnail_as_bg'),
	},

	playerSettings: {
		baseKey: BaseSetting(sel),

		play_style: dom('strict'),
		mute_style: dom('strict'),
		fullscreen_style: dom('disabled'),

		url_boundaries: dom('strict'),
		url_volume: dom('strict'),

		ps_options: dom('mantain_last_active_player'),
	},

	range: {
		baseKey: BaseSetting(rng),
		timestamp_display_scroll_offset: {
			baseKey: BaseDom('5', int),
			tdso_opt: InlinePmt(`seconds up to 60`),
		},
		end_loop_sound_volume: {
			baseKey: BaseDom('50', int),
			elsv_opt: InlinePmt(`integers from 0 to 100`),
		},
		iframe_buffer_slider: {
			baseKey: BaseDom('10', int),
			ibs_opt: InlinePmt(`integers from 1 to 30`),
		},
	},
	defaultPlayerValues: {
		baseKey: BaseSetting(),
		player_span: {
			baseKey: BaseInitSetting('50%', str),
			ps_opt: InlinePmt(
				`empty means 50% - only valid css units like px  %  vw`
			),
			pv_opt_2: InlinePmt(
				"each block's url parameter `&sp=` has priority over this"
			),
		},
		player_volume: {
			baseKey: BaseInitSetting(40, int),
			vv_opt: InlinePmt(`integers from 0 to 100`),
			pv_opt: InlinePmt(
				"each block's url parameter `&vl=` has priority over this"
			),
		},
		player_interface_language: {
			baseKey: BaseInitSetting('en', str),
			pil_opt: InlinePmt(
				"each block's url parameter `&hl=` has priority over this"
			),
			pli_guide: InlinePmt(
				`https://developers.google.com/youtube/player_parameters#:~:text=Sets%20the%20player%27s%20interface%20language.%20The%20parameter%20value%20is%20an%20ISO%20639-1%20two-letter%20language%20code%20or%20a%20fully%20specified%20locale.%20For%20example%2C%20fr%20and%20fr-ca%20are%20both%20valid%20values.%20Other%20language%20input%20codes%2C%20such%20as%20IETF%20language%20tags%20(BCP%2047)%20might%20also%20be%20handled%20properly.`
			),
		},
		player_captions_language: {
			baseKey: BaseInitSetting('en', str),
			pcl_opt: InlinePmt(
				"each block's url parameter `&cc=` has priority over this"
			),
			pcl_guide: InlinePmt(
				`https://developers.google.com/youtube/player_parameters#:~:text=This%20parameter%20specifies%20the%20default%20language%20that%20the%20player%20will%20use%20to%20display%20captions.%20Set%20the%20parameter%27s%20value%20to%20an%20ISO%20639-1%20two-letter%20language%20code.`
			),
		},
		player_captions_on_load: {
			baseKey: BaseInitSetting('true', bol),
			pcol_guide: InlinePmt(
				"Browsers love to cash data... if set to -true- most certently you'll get caption on load, but it's hard to tell otherwise... Also, the mix and match of diferent `&hl=` and `&cc=` can cause to not show the captions on load"
			),
		},
	},
	defaultValues: {
		baseKey: BaseSetting(),
		override_roam_video_component: {
			baseKey: BaseInitSetting('', [bol, str]),
			orvc_opt: InlinePmt(
				'distinguish between `{{[[video]]:}}` from `{{[[yt-gif]]:}}` or "both" which is also valid'
			),
		},
		end_loop_sound_src: {
			baseKey: BaseInitSetting(
				'https://freesound.org/data/previews/256/256113_3263906-lq.mp3',
				url
			),
			elss_opt: InlinePmt(
				`src sound when yt gif makes a loop, empty if unwanted`
			),
		},
		override_simulate_url_to_video_component: {
			baseKey: BaseInitSetting('', bol),
			orsuvc_opt: InlinePmt(
				`Because of browsers' external problems, I'd like to set this as the "usage key" replacement`
			),
		},
		YT_API_KEY_V3: {
			baseKey: BaseInitSetting('', str),
			yakv_opt: InlinePmt(``),
		},
		InAndOutKeys: {
			baseKey: BaseInitSetting('ctrlKey', str),
			iaok_opt: InlinePmt(
				`Any permutation of: altKey, shiftKey, ctrlKey \nfollowed by a "," coma\n\nMiddle mouse button is on by default`
			),
		},
	},
	dropdownMenu: {
		baseKey: BaseSetting(),
		ddm_css_theme_input: {
			baseKey: BaseInitSetting('', chk),
			ct_opt: InlinePmt(`"dark" == "true" or "light" == "false"`),
		},
	},
	LogStatus: {
		baseKey: BasePmt(`Everything looks alright :D`),
		DisplacedBlocks: {
			baseKey: BasePmt(
				`invalid -> settings block - deleted - deprecated\n**__If you encounter any nested blocks, it's extremely advisable that you delete them__**`
			),
		},
		UnknownBlocks: {
			baseKey: BasePmt(
				`... to the YT GIF SETTINGS PAGE script algorithm-functions`
			),
		},
		ls_: InlinePmt(`End of settings`),
	},
}
YT_GIF_SETTINGS_PAGE.Workflow.baseKey.string = `The ${
	Object.keys(YT_GIF_SETTINGS_PAGE).length
} blocks will be -added on updates- and -removed if deprecated- automatically. The last parameters "<>" are customizable. 🐕 👋`

export type PAGE_TYPE = typeof YT_GIF_SETTINGS_PAGE
