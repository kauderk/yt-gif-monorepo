import { isTrue } from '$lib/utils'

type s = string
const urlFolder = (f: s) =>
	`https://kauderk.github.io/yt-gif-extension/resources/${f}`
const self_urlFolder = (f: s) =>
	`https://kauderk.github.io/yt-gif-extension/v0.2.0/${f}`
const urlFolder_css = (f: s) => urlFolder(`css/${f}`)
const urlFolder_html = (f: s) => urlFolder(`html/${f}`)
const urlFolder_js = (f: s) => urlFolder(`js/${f}`)

export const links = {
	css: {
		index: `https://kauderk.github.io/code-snippets/yt-gif/roamresearch/dev/yt-gif-app.css`,
		themes: {
			dark: urlFolder_css('themes/dark-drop-down-menu.css'),
			light: urlFolder_css('themes/light-drop-down-menu.css'),
			get: function (i: s | n) {
				return this.toogle(!isTrue(i))
			},
			toogle: function (t: b) {
				return isTrue(t) ? this.dark : this.light
			},
		},
	},
	html: {
		dropDownMenu: self_urlFolder('html/drop-down-menu.html'),
		playerControls: self_urlFolder('html/player-controls.html'),
		urlBtn: self_urlFolder('html/url-btn.html'),
		anchor: self_urlFolder('html/yt-gif-anchor.html'),
		insertOptions: self_urlFolder('html/insert-options.html'),
		fetched: {
			playerControls: '',
			urlBtn: '',
			anchor: '',
			insertOptions: '',
		},
	},
	js: {
		utils: urlFolder_js('js'),
		roamAlphaApi: urlFolder_js('utils-roam-alpha-api.js'),
		settingsPage: self_urlFolder('js/settings-page.js'),
		main: self_urlFolder('js/yt-gif-main.js'),
	},
	help: {
		github_isuues: `https://github.com/kauderk/kauderk.github.io/issues`,
	},
}
export type TCss = typeof cssData
export const cssData = <const>{
	yt_gif: 'yt-gif',
	yt_gif_wrapper: 'yt-gif-wrapper',
	yg_wrapper_p: 'yt-gif-wrapper-parent',
	yt_gif_iframe_wrapper: 'yt-gif-iframe-wrapper',
	yt_gif_timestamp: 'yt-gif-timestamp',
	yt_gif_audio: 'yt-gif-audio',
	yt_gif_custom_player_span_first_usage:
		'ty-gif-custom-player-span-first-usage',

	awiting_player_pulse_anim: 'yt-gif-awaiting-palyer--pulse-animation',
	awaitng_player_user_input: 'yt-gif-awaiting-for-user-input',
	awaitng_input_with_thumbnail:
		'yt-gif-awaiting-for-user-input-with-thumbnail',

	ddm_icon: 'ty-gif-icon',

	dwn_no_input: 'dropdown_not-allowed_input',
	dropdown_fadeIt_bg_animation: 'dropdown_fadeIt-bg_animation',
	dropdown_forbidden_input: 'dropdown_forbidden-input',
	dropdown_allright_input: 'dropdown_allright-input',

	dropdown__hidden: 'dropdown--hidden',
	dropdown_deployment_style: 'dropdown_deployment-style',
	dwp_message: 'dropdown-info-message',
	ddm_info_message_selector: `.dropdown .dropdown-info-message`,

	dwn_pulse_anim: 'drodown_item-pulse-animation',

	ddm_exist: 'yt-gif-drop-down-menu-toolbar',

	ddm_focus: 'dropdown-focus',

	stt_allow: 'settings-not-allowed',

	ditem_allow: 'dropdown-item_not-allowed_input',

	p_controls: 'yt-gif-controls',

	ddn_tut_awaiting: 'ddm-tut-awaiting-input',

	id: {
		navigate_btn: '#navigate-to-yt-gif-settings-page',
		toogle_theme: '#yt-gif-ddm-theme',
		ddm_main_theme: '#yt-gif-ddm-main-theme',
	},
	raw_anchorSel: 'rm-xparser-default-anchor',
}
export const attrData = {
	// [data-main] -> [data-bind]
	'initialize-mode': '',
	'timestamp-experience': '',
	'timestamp-loop-opt': '',
	ms_options: '',
	fmt_options: '',
}
export const attrInfo = {
	url: {
		path: 'data-video-url',
		index: 'data-video-index',
	},
	target: 'data-target',
	uid: 'data-uid',
	creation: {
		name: 'data-creation',
		forceAwaiting: 'force-awaiting',
		cleaning: 'cleaning',
		displaced: 'displaced',
		buffer: 'buffer',
	},
}
/*-----------------------------------*/
export const ytGifAttr = {
	sound: {
		mute: 'yt-mute',
		unMute: 'yt-unmute',
	},
	play: {
		playing: 'yt-playing',
		paused: 'yt-paused',
	},
	extra: {
		readyToEnable: 'readyToEnable',
	},
} as const
