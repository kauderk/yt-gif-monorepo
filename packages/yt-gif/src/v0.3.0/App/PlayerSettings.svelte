<script lang="ts">
	import Sub from '../components/Sub/index.svelte'
	import Separator from '../components/Separator.svelte'
	import MultipleOptions from '../components/Sub/MultipleOptions.svelte'
	import Tutorials from '../components/Tutorials.svelte'
	import {
		menu,
		play_style,
		mute_style,
		fullscreen_style,
		url_boundaries,
		url_volume,
	} from './PlayerSettings'
	import SelectLabel from '$v3/components/Select/SelectLabel.svelte'
	import MainHover from '$v3/components/MainHover.svelte'

	const tuts = {
		hide: { name: 'Hide' },
		PWT3aHOiKRA: {
			name: 'Play/Mute Styles',
			'data-tooltip': 'Scenerios where YT GIFs overlap others',
		},
	}
	const options = <const>{
		id: 'ps_options',
		options: {
			mantain_last_active_player: {
				name: 'Mantain last active player',
				'data-tooltip': `Keep Playing - Make them active by interacting with them in a decive way: exiting yt-gifs while holding down 'InAndOutKeys' or by firing timestamp`,
				selected: true,
			},

			minimize_on_video_ended: {
				name: 'Smoll Vid When Big Ends',
				'data-tooltip': 'Exit Fullscreen when the clip ends?',
			},
		},
	}
</script>

<Tutorials options={tuts} />

<SelectLabel options={play_style} />
<SelectLabel options={mute_style} />
<SelectLabel options={fullscreen_style} />

<Separator />
<SelectLabel options={url_boundaries} />
<SelectLabel options={url_volume} />

<Separator class="mb-2" />
<MultipleOptions props={options} />
<span class="mb-2" />
