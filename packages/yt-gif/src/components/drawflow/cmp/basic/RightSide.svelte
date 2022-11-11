<script>
	import { fly } from 'svelte/transition'
	import { state } from './store'
</script>

{#if $state.active == 'rightSidebar'}
	<div id="right-panel" transition:fly={{ x: 300 }}>
		<slot />
	</div>
{/if}

<style lang="scss">
	@use './style.scss';

	#right-panel {
		height: 100%;
		top: 0;
		right: 0;
		// counter style.scss
		left: auto;

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
