<script lang="ts">
	import Sub from '../components/Sub/index.svelte'
	import MainHover from '$v3/components/MainHover.svelte'
	import Tutorials from '../components/Tutorials.svelte'

	import SelectLabel from '$v3/components/Select/SelectLabel.svelte'
	import Separator from '../components/Separator.svelte'
	import MultipleOptions from '$v3/components/Sub/MultipleOptions.svelte'
	import Icon from '$v3/components/Icon.svelte'

	import {
		menu,
		tuts,
		recoveryOptions,
		seekTo,
		restore,
		reset,
		seekToActions,
		loopTimestamps,
		displayTm,
		grabTm,
		startEndOptions,
		LoopOptions,
		featuresOptions,
		smartBlocksLink,
	} from './Timestamps'
	import OptionalContainer from '$v3/components/OptionalContainer.svelte'

	$: selection = ['disabled']
</script>

<Tutorials options={tuts} />

<OptionalContainer
	options={recoveryOptions}
	checked={true}
	fragment={true}
	class="flex flex-column items-end flex-col">
	<SelectLabel options={seekTo} />
	<SelectLabel options={restore} />
	<SelectLabel options={reset} />
</OptionalContainer>

<Separator />
<SelectLabel options={seekToActions} />
<SelectLabel
	options={loopTimestamps}
	on:option={e => (selection = [e.detail.value])} />
<span class:hidden={selection.includes('disabled')} class="mb-1 flex gap-5">
	<MultipleOptions single={true} props={startEndOptions} />
	<MultipleOptions props={LoopOptions} />
</span>

<Separator />
<SelectLabel options={displayTm} />
<SelectLabel options={grabTm} />

<Separator class="mb-2" />
<MultipleOptions props={featuresOptions}>
	<span class="btn-icon-inline">
		<Icon {...smartBlocksLink} />
	</span>
</MultipleOptions>
