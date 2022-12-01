import { getOption } from '../../lib/backend-frontend/option'
import { cssData, links } from '../config/paths'
import { UI } from '../config/yt-gif-init'
import { SaveSettingsOnChanges } from '../dom/ui/change'
import { DDM_to_UI_variables } from '../dom/ui/transform'
import {
	initialize_modes_synergy,
	togglePlayPauseStyles,
} from '../dom/listener'
import { navigateToSettingsPageInSidebar } from '../dom/sidebar'
import { ToggleTheme } from '../dom/theme'
import { FlipBindAttr } from '../dom/attribute/bind'
import { ToggleThumbnails } from '../dom/thumbnail'
import { UpdateOnScroll_RTM } from '../dom/scroll'
import { DDMHover } from '../dom/drop-down-menu/hover'
import { SetUpSelectTutorials } from '../tutorial'
import { assignFirstAnchorWave, SetupAnchorObserver } from '../observer/anchor'
import { InlineUrlBtnMutations_cb } from '../observer/formatter'
import { MasterObserver_UCS_RTM } from '../observer/switch'
import { SetUpTutorials_smartNotification } from '$v3/init/tutorial/notification/index'
import { ResetMasterObservers } from './reset'
import { ListenForUrlOptions } from './observer/formatter'
import {
	KickstartTimestampObserver,
	ClearTimestampObserver,
} from './observer/timestamp'
import { KickStartMasterObserver } from './observer/ytgif'
import { LoadCSS, LoadHTML } from './fetch'
import { RunTutorialsObserver } from './observer/tutorial'
import { SrrGlobal } from '$lib/global/SrrGlobal'

export async function Ready() {
	// TODO: set timestampRecovery.seekTo.currentTime
	// TODO: set experience.inputType.clicks
	// 0. the objects "UI", "links", "attrData" and "cssData" are linked to all of these functions
	ResetMasterObservers()

	// 1. fetch
	// @DDM
	// await LoadCSS() // UCS - user customizations
	// await LoadHTML() // DDM - drop down menu

	// 2. assign direct values to the main object | UI - user inputs
	// @DDM?
	// DDM_to_UI_variables() // filtering baseKey & prompts and transforming them from objs to values or dom els - it is not generic and only serves for the first indent level (from parent to child keys)
	// SaveSettingsOnChanges() // the settings page script is responsible for everything, these are just events

	// 3. set up events
	// @DDM
	// DDMHover()

	// FlipBindAttr() // RTM runtime

	// UpdateOnScroll_RTM(UIStore.get().range.timestamp_display_scroll_offset)
	// UpdateOnScroll_RTM(UIStore.get().range.end_loop_sound_volume)
	// UpdateOnScroll_RTM(UIStore.get().range.iframe_buffer_slider)

	// ToggleThumbnails(getOption(UIStore.get().experience.xp_options, 'thumbnail_as_bg'))

	// navigateToSettingsPageInSidebar()
	// ToggleTheme()

	// initialize_modes_synergy()

	// 3.1 pre startup - anchors
	// assignFirstAnchorWave()
	// SetupAnchorObserver()

	// 3.2 pre startup - iframes
	// togglePlayPauseStyles()

	// 4. run extension and events - set up
	await MasterObserver_UCS_RTM() // listening for changes | change the behavior RTM // BIG BOI FUNCTION
	KickStartMasterObserver()

	// 5. Setting up tutorials
	const ddmElmWithListeners = RunTutorialsObserver()
	SetUpSelectTutorials({ ...ddmElmWithListeners, ...cssData })
	SetUpTutorials_smartNotification()

	// 6. Emulate -> slash menu, timestamps + shortcuts
	SrrGlobal.YT_GIF_OBSERVERS.timestampObserver = ClearTimestampObserver()
	// 6.1 cleanAndSetUp_TimestampEmulation -> PlayPauseOnClicks
	// 6.2 run timestampObserver
	// 6.3 registerKeyCombinations (keyupEventHandler)
	//      6.3.1 addBlockTimestamps
	await KickstartTimestampObserver()

	// 7. simulate inline url btn
	const urlObserver = new MutationObserver(InlineUrlBtnMutations_cb)
	ListenForUrlOptions(urlObserver)

	console.log('YT GIF extension activated')
}
