<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { states } from '../types'
	import { state } from './store'

	export let active: states = 'leftSidebar'
</script>

{#if $state.active == active}
	<div id="left-panel" transition:fly={{ x: -300 }}>
		<slot />
	</div>
{/if}

<style lang="scss">
	@use './style.scss';

	#left-panel {
		height: 94%;
		bottom: 0;
		#example-wrapper {
			position: relative;
			z-index: 2;
			display: grid;
			display: flex;
			flex-direction: column;
			gap: 0.5em;
		}
	}
</style>
