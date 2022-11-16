<script lang="ts">
	import { onMount } from 'svelte'
	import { state } from '../../basic/store'
	import TopLeft from '../../basic/TopLeft.svelte'
	import Button from './Button.svelte'
	import { register, startTour } from './Tour.svelte'
	import EmailFeedback from './EmailFeedback.svelte'
	import Tooltip from './Tooltip.svelte'
	import { dev } from '$app/environment'

	onMount(() => state.useLocalStorage())
	let showI = false
</script>

<svelte:component this={TopLeft}>
	<div id="controls">
		<div
			class="buttons"
			on:mouseenter={() => (showI = true)}
			on:mouseleave={() => (showI = false)}>
			<label for="none" class="indicator">
				View
				{#if showI}
					<Tooltip info={['Show me around']}>
						<span
							class="indicator-item badge"
							style="color: #8BC34A">
							<button
								on:click={() =>
									startTour({
										message:
											"Welcome, let's start the tour now.",
										step: 0,
									})}>
								<i class="fa-sharp fa-solid fa-circle-info" />
							</button>
						</span>
					</Tooltip>
				{/if}
			</label>
			<div
				use:register={'This is the Full Graph view. All your active nodes live here.'}>
				<Button active="fullGraph" on="diagram-project" />
			</div>
			<div
				use:register={'All your files, folders and workspaces live here.'}>
				<Button active="Explorer" on="list-tree" />
			</div>
			<div
				use:register={'Create your Presets then can Drag And Drop them onto the canvas.'}>
				<Button active="leftSidebar" on="sidebar" />
			</div>
			<div use:register={'All Node settings live here.'}>
				<Button active="rightSidebar" on="sidebar-flip" />
			</div>
			<div use:register={'Here you will see your Layouts Worspaces.'}>
				<Button active="Layouts" on="gallery-thumbnails" />
			</div>
		</div>

		<div class="feedback">
			<i class="fa-solid fa-message-pen" />
			<Tooltip
				info={dev
					? [
							'This is a development evnrimomment',
							`AVOID sending "SCREENSHOTS"`,
							'COORS is disabled',
					  ]
					: [
							`🕵️ It's completely anonymous`,
							`🛡️ Help use improve the user experience`,
					  ]}
				delay={dev ? 0 : 1000}>
				<EmailFeedback />
			</Tooltip>
		</div>
	</div>
</svelte:component>

<style lang="scss">
	.feedback,
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
	}
	#controls {
		background: rgba(50, 50, 50, 0.2);
		backdrop-filter: blur(3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1rem;
		padding: 0.1em 0.5em;
	}

	label {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
	}
</style>
