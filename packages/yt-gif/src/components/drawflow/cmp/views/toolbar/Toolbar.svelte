<script lang="ts">
	import { onMount } from 'svelte'
	import { state } from '../../basic/store'
	import TopLeft from '../../basic/TopLeft.svelte'
	import Button from './Button.svelte'
	import { startTour } from './Tour.svelte'

	onMount(() => state.useLocalStorage())

	function onTour() {
		startTour([
			// @ts-ignore
			{
				message: `Welcome, let's start the tour now.`,
			},
			{
				element: '#fullGraph',
				message: 'You can use filters too.',
			},
			{
				element: '#leftSidebar',
				message: 'You can sort customers here.',
			},
			{
				element: '#rightSidebar',
				message:
					'Country filter is already populated with the existing countries from our customers database',
			},
			{
				element: '#Layouts',
				message: 'F',
			},
		])
	}
</script>

<svelte:component this={TopLeft}>
	<div id="controls">
		<label for="none">View</label>

		<Button active="fullGraph" on="diagram-project" />
		<Button active="leftSidebar" on="sidebar" />
		<Button active="rightSidebar" on="sidebar-flip" />
		<Button active="Layouts" on="gallery-thumbnails" />

		<button on:click={onTour}>go</button>
		<!-- https://github.com/kommitapp/kommit/search?q=OLSKAppToolbarGuideLink -->
		<a
			href="javascript:window.location.href = window.atob('bWFpbHRvOmErUlBfMDA0QHJjcmVhdGl2LmNvbQ==')"
			>Send feedback</a>
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
