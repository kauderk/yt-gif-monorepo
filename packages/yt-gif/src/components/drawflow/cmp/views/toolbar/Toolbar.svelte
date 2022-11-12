<script lang="ts">
	import { onMount } from 'svelte'
	import { state } from '../../basic/store'
	import TopLeft from '../../basic/TopLeft.svelte'
	import Button from './Button.svelte'
	import { register, startTour } from './Tour.svelte'
	import EmailFeedback from './EmailFeedback.svelte'

	onMount(() => state.useLocalStorage())
</script>

<svelte:component this={TopLeft}>
	<div id="controls">
		<label for="none">View</label>

		<div use:register={'You can use filters too.'}>
			<Button active="fullGraph" on="diagram-project" />
		</div>
		<div use:register={'You can sort customers here.'}>
			<Button active="leftSidebar" on="sidebar" />
		</div>
		<div
			use:register={'Country filter is already populated with the existing countries from our customers database'}>
			<Button active="rightSidebar" on="sidebar-flip" />
		</div>
		<div use:register={'F'}>
			<Button active="Layouts" on="gallery-thumbnails" />
		</div>

		<button
			on:click={() =>
				startTour({
					message: "Welcome, let's start the tour now.",
					step: 0,
				})}>go</button>
		<EmailFeedback />
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
