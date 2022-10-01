<script lang="ts">
	import Tutorials from '../components/Tutorials.svelte'

	import MultipleOptions from '../components/Sub/MultipleOptions.svelte'
	import SelectLabel from '$v3/components/Select/SelectLabel.svelte'
	import RangeLabel from '../components/Range/RangeLabel.svelte'
	import Separator from '../components/Separator.svelte'

	import {
		yt_playback_speed,
		iframe_buffer_slider,
		end_loop_sound_volume,
		options,
		formatterOptions,
		tuts,
	} from './Miscellaneous'

	$: selection = Array<s>()
	$: hidden = !selection.includes('simulate_url_formatter')
</script>

<Tutorials options={tuts} />

<MultipleOptions
	props={options}
	on:option={e => (selection = e.detail.selection)} />
<span class:hidden class="m-2">
	<MultipleOptions props={formatterOptions} />
</span>

<Separator class="mt-1" />
<SelectLabel options={yt_playback_speed} />

<Separator />
<RangeLabel options={iframe_buffer_slider} />

<Separator />
<RangeLabel options={end_loop_sound_volume} />
