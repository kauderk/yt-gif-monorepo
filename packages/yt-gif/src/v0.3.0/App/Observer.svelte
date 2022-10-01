<script lang="ts">
	import Tutorials from '../components/Tutorials.svelte'

	import MultipleOptions from '$v3/components/Sub/MultipleOptions.svelte'
	import Separator from '../components/Separator.svelte'
	import MainOptional from '$v3/components/MainOptional.svelte'
	import Icon from '$v3/components/Icon.svelte'

	import { tuts, featuresOptions } from './Deployment'

	const resetIcon = <const>{
		on: 'eraser',
		type: 'check',
		tooltip: 'Erase Previous YT GIFs',
		selected: true,
	}
</script>

<Tutorials options={tuts} />

<MultipleOptions single={true} props={featuresOptions} />
<Separator class="mt-2" />

<span class="flex items-center">
	<MainOptional id="deploy_yt_gifs" tooltip="Submit Changes"
		>Deploy</MainOptional>
	<span class="btn-icon-inline">
		<Icon {...resetIcon} />
	</span>
</span>
