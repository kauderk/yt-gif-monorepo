<script lang="ts">
	import { onMount } from 'svelte'

	export let inject: Function
	let space = true
	let mount = false

	onMount(() => {
		mount = true
		return () => {
			space = false
		}
	})
</script>

<span class="bp3-popover-wrapper" use:inject>
	<span aria-haspopup="true" class="bp3-popover-target">
		<span class="bp3-popover-wrapper">
			<span aria-haspopup="true" class="bp3-popover-target">
				<slot />
				<!-- <span
					class="bp3-button bp3-minimal bp3-small bp3-icon-more"
					tabindex="0" /> -->
			</span>
		</span>
	</span>
</span>
{#if space && mount}
	<div class="rm-topbar__spacer-sm ytgif-inject" />
{/if}
