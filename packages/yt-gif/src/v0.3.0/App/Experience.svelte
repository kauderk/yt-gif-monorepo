<script lang="ts">
	import Sub from '../components/Sub/index.svelte'
	import MainHover from '$v3/components/MainHover.svelte'
	import Tutorials from '../components/Tutorials.svelte'

	import SelectLabel from '$v3/components/Select/SelectLabel.svelte'
	import Separator from '../components/Separator.svelte'
	import MultipleOptions from '../components/Sub/MultipleOptions.svelte'
	import Range from '../components/Range/Range.svelte'

	import { timestamp_display_scroll_offset } from './Miscellaneous'
	import {
		awaiting_input_type,
		initialize_mode,
		initialize_modeOptions,
		menu,
		tuts,
	} from './Experience'

	$: selection = ['input_x_buffer']
	$: hidden = selection.includes('disabled')
	$: noInput = selection.includes('input') || hidden
	// prettier-ignore
	$: initialize_modeOptions.options.try_to_load_when_rendered.hide = noInput || selection.includes('overflow')
</script>

<Tutorials options={tuts} />

<span>
	<SelectLabel
		options={initialize_mode}
		on:option={e => (selection = [e.detail.value])} />
</span>
<Separator />

<div class:hidden>
	<SelectLabel options={awaiting_input_type} />
</div>
<MultipleOptions props={initialize_modeOptions} />
<span class="mb-2" />

<style>
	span :global(.wrapper) {
		grid-template-columns: 0.5fr 1fr;
	}
</style>
