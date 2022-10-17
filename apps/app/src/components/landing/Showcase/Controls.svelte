<script>
	import { query } from '$lib/actions/containerClasses'
	import Icon from './Icon.svelte'
	import {
		mdiTimerEditOutline,
		mdiTimelinePlus,
		mdiFilePlus,
		mdiDrag,
	} from '@mdi/js'

	const breakpoints = {
		95: ['sm'],
		195: ['md'],
		295: ['lg'],
	}
</script>

<div class="main_container" use:query={breakpoints}>
	<div class="menu">
		{#each [mdiDrag, mdiTimerEditOutline, mdiTimelinePlus, mdiFilePlus] as path}
			<div class="menu_element menu_option"><Icon {path} /></div>
		{/each}
	</div>
</div>

<style>
	:global(.sm) {
		background-color: #00aa00;
	}

	:global(.md) {
		background-color: #ffaadd;
	}

	:global(.lg) {
		background-color: #ff00dd;
	}

	.main_container {
		border: 1px solid var(--primaryShade3);
		border-radius: 6px;
		background: var(--primaryShade4);

		perspective: 1000px;

		transition: width 1200ms cubic-bezier(0.5, 0, 0, 1.5);
	}

	.menu {
		padding: 0.1em 0;
		position: relative;

		overflow: hidden;

		display: flex;
		flex-direction: row-reverse;
		justify-content: space-evenly;
		align-items: center;

		transition: 0.2 width 700ms ease;
	}

	.menu_element {
		color: var(--primaryShade1);
		aspect-ratio: 1 / 1;
		border-radius: 6px;
		margin: 0.05em;
		font-family: sans-serif;
		transition: box-shadow 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
		cursor: pointer;
		user-select: none;
	}

	.menu_element:hover {
		box-shadow: -2px 3px 3px 1px var(--accentColor);
	}

	.menu_element:active {
		box-shadow: -1px 3px 3px -2px var(--accentColor);
	}
</style>
