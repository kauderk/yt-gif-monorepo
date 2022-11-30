export { recoveryOptions } from '$v3/App/Timestamps'

import {
	iframe_buffer_slider,
	end_loop_sound_volume,
	timestamp_display_scroll_offset,
} from '$v3/App/Miscellaneous'

export const iframe_buffer_slider_input = iframe_buffer_slider.range.attr
export const end_loop_sound_volume_input = end_loop_sound_volume.range.attr
export const timestamp_display_scroll_offset_input =
	timestamp_display_scroll_offset.attr

const checkbox = (b = false) => ({ value: b })

export const ddm_css_theme_input = checkbox()
//menu
export const suspend_yt_gif_deployment = checkbox()

// radio hidden submenu
export const deployment_style_yt_gif = checkbox(true)
export const deployment_style_video = checkbox()
export const deployment_style_both = checkbox()

// hidden submenu
export const deploy_yt_gifs = checkbox()

export const simulate_roam_research_timestamps = checkbox()
