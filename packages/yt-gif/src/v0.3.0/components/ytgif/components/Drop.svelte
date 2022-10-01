<script lang="ts">
	// @ts-nocheck
	import OriginalPopover from 'svelte-popover'
	import Tooltip from '$v3/components/Tooltip.svelte'
	import Icon from '$v3/components/Icon.svelte'

	export let entryIcon: {
		on: s
		off?: s
		tooltip: s
		placement: 'top' | 'bottom' | 'left' | 'right'
	}
</script>

<span>
	<OriginalPopover action="hover" arrow={false}>
		<svelte:fragment slot="target">
			<Icon {...entryIcon} />
		</svelte:fragment>
		<svelte:fragment slot="content">
			<slot />
		</svelte:fragment>
	</OriginalPopover>
</span>

<style>
	span :global(.popover) {
		display: block !important;
	}
</style>
