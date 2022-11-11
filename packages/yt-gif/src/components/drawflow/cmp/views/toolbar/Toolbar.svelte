<script lang="ts">
	import { onMount } from 'svelte'
	import { state } from '../../basic/store'
	import TopLeft from '../../basic/TopLeft.svelte'
	import Button from './Button.svelte'

	onMount(() => state.useLocalStorage())
</script>

<svelte:component this={TopLeft}>
	<div id="controls">
		<label for="none">View</label>
		<Button active="leftSidebar" on="sidebar" off="diagram-project" />
		<Button active="rightSidebar" on="sidebar-flip" />
		<Button active="Layouts" on="gallery-thumbnails" />
	</div>
</svelte:component>

<style lang="scss">
	#controls {
		background: rgba(50, 50, 50, 0.2);
		backdrop-filter: blur(3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 0.5rem;
		padding: 0.1em 0.5em;
	}

	label {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
	}
</style>
