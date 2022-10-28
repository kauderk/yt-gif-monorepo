import { getUniqueSelectorSmart } from '$lib/utils'
import { windowExist } from '$lib/windowStore'
import { CleanAndBrandNewWrapper } from '../../lib/utils'
import { attrInfo } from './paths'

type T_UI = {
	defaultPlayerValues: {
		player_captions_language: string | 'en'
		player_captions_on_load: string | 'true'
		player_interface_language: string | 'en'
		player_span: string | '50%'
		player_volume: number
	}
	defaultValues: {
		InAndOutKeys: string | 'ctrlKey,altKey'
		YT_API_KEY_V3: string
		end_loop_sound_src:
			| 'https://freesound.org/data/previews/256/256113_3263906-lq.mp3'
			| string
		override_roam_video_component: string
		override_simulate_url_to_video_component: string
	}
	deploymentStyle: {
		deploy_yt_gifs: HTMLInputElement
		deployment_style_both: HTMLInputElement
		deployment_style_video: HTMLInputElement
		deployment_style_yt_gif: HTMLInputElement
		suspend_yt_gif_deployment: HTMLInputElement
	}
	display: {
		fmt_options: HTMLSelectElement
		ms_options: HTMLSelectElement
		simulate_roam_research_timestamps: HTMLInputElement
		yt_playback_speed: HTMLSelectElement
	}
	dropdownMenu: {
		ddm_css_theme_input: HTMLInputElement
	}
	experience: {
		awaiting_input_type: HTMLSelectElement
		initialize_mode: HTMLSelectElement
		xp_options: HTMLSelectElement
	}
	playerSettings: {
		fullscreen_style: HTMLSelectElement
		mute_style: HTMLSelectElement
		play_style: HTMLSelectElement
		ps_options: HTMLSelectElement
		url_boundaries: HTMLSelectElement
		url_volume: HTMLSelectElement
	}
	range: {
		end_loop_sound_volume: HTMLInputElement
		iframe_buffer_slider: HTMLInputElement
		timestamp_display_scroll_offset: HTMLInputElement
	}
	timestamps: {
		tm_loop_hierarchy: HTMLSelectElement
		tm_loop_options: HTMLSelectElement
		tm_loop_to: HTMLSelectElement
		tm_options: HTMLSelectElement
		tm_recovery: HTMLInputElement
		tm_reset_on_removal: HTMLSelectElement
		tm_restore: HTMLSelectElement
		tm_seek_action: HTMLSelectElement
		tm_seek_to: HTMLSelectElement
		tm_workflow_display: HTMLSelectElement
		tm_workflow_grab: HTMLSelectElement
	}
}

// I shouldn't be able to do this...
export let UI = <T_UI>{}

//export const YT = window.YT

export const iframeIDprfx = 'player_'
export let currentFullscreenPlayer: string
export const setCurrentFullscreenPlayer = (id: string) =>
	(currentFullscreenPlayer = id)

/*-----------------------------------*/
export const YT_GIF_OBSERVERS_TEMP = {
	masterMutationObservers: Array<Tobserver>(),
	masterIntersectionObservers: Array<Tobserver>(),
	masterIntersectionObservers_buffer: Array<Tobserver>(),
	masterIframeBuffer: Array<Tobserver | string>(),
	//slashMenuObserver: null,
	timestampObserver: null as MutationObserver | null,
	keyupEventHandler: (e: KeyboardEvent): void => {},
	creationCounter: -1, // crucial, because the api won't reload iframes with the same id
	CleanMasterObservers: function () {
		const mutObjRes = cleanObserverArr(this.masterMutationObservers)
		this.masterMutationObservers = mutObjRes.observer

		const insObjRes = cleanObserverArr(this.masterIntersectionObservers)
		this.masterIntersectionObservers = insObjRes.observer

		const bufObjRes = cleanObserverArr(
			this.masterIntersectionObservers_buffer
		)
		this.masterIntersectionObservers_buffer = insObjRes.observer

		console.log(
			`${mutObjRes.counter} mutation, ${insObjRes.counter} intersection and ${bufObjRes.counter} iframe buffer master observers cleaned`
		)

		function cleanObserverArr(observer: Array<Tobserver>) {
			//https://www.codegrepper.com/code-examples/javascript/how+to+do+a+reverse+loop+in+javascript#:~:text=www.techiedelight.com-,how%20to%20reverse%20loop%20in%20javascript,-javascript%20by%20Dark
			let counter = 0
			for (let i = observer.length - 1; i >= 0; i--) {
				observer[i].disconnect()
				observer.splice(i, 1)
				counter++
			}
			return <const>{
				observer,
				counter,
			}
		}
	},
	CleanLoadedWrappers: function () {
		const wrappers = document.queryAllasArr(`[${attrInfo.target}]`)

		for (let i = wrappers.length - 1; i >= 0; i--) {
			CleanAndBrandNewWrapper(
				document.querySelector(
					getUniqueSelectorSmart(wrappers[i])
				) as El,
				attrInfo.creation.name,
				attrInfo.creation.cleaning
			) //wrapperParent -> nest new span
		}
	},
	dmm_html: null,
}

windowExist.subscribe(() => {
	// FIXME: window
	// window.YT_GIF_OBSERVERS = !window.YT_GIF_OBSERVERS
	// 	? YT_GIF_OBSERVERS_TEMP
	// 	: window.YT_GIF_OBSERVERS
})
export function TryCreateUserInputObject(
	YT_GIF_SETTINGS_PAGE: typeof window.YT_GIF_SETTINGS_PAGE
): T_UI {
	return (UI = JSON.parse(
		JSON.stringify(
			Object.assign(YT_GIF_SETTINGS_PAGE, {
				// FIXME: SHould be a separate object
				deploymentStyle: {
					//menu
					suspend_yt_gif_deployment: '',

					// radio hidden submenu
					deployment_style_yt_gif: '1',
					deployment_style_video: '',
					deployment_style_both: '',

					// hidden submenu
					deploy_yt_gifs: '',
				},
			})
		)
	) as unknown as T_UI)
}
export function GetPlayerState() {
	return window.YT.PlayerState
}
