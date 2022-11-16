<script lang="ts">
	import { ScaleToFitParent } from '$cmp/stand-alone/ScaleToFitParent'
	import Drag from '../blocks/Drag.svelte'
	import { getContext } from '../store'
	import Controls from './controls/Controls.svelte'

	export let hue = 0
	export let icon = 'info'
	export let expanded = false
	export let cmp: any = null
	export let GraphNodeID: string = 'missing'

	const ctx = getContext()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="item" class:expanded style="--hue: {hue}" on:click>
	<div class="controls">
		{#if expanded}
			<Controls />
		{:else}
			<i class="icon material-icons">{icon}</i>
		{/if}
	</div>
	{#if expanded}
		{#if cmp}
			<div class="whole" use:ScaleToFitParent>
				<Drag {...$ctx.dnd} name={GraphNodeID}>
					<svelte:component this={cmp} />
				</Drag>
			</div>
		{:else}
			<slot />
		{/if}
	{/if}
</div>

<style lang="scss">
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 5rem;
		aspect-ratio: 1 / 1;

		border-width: 0.1em;
		border-style: solid;
		border-radius: 0.5rem;

		border-color: hsl(var(--hue), 100%, 30%);
		color: hsl(var(--hue), 100%, 30%);

		font-size: 14px;
		font-weight: bold;

		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		text-align: center;

		// icon
		&:not(.expanded):hover {
			background-color: hsl(var(--hue), 100%, 40%);
			border-color: hsl(var(--hue), 100%, 40%);
			color: hsl(var(--hue), 100%, 95%);
		}
		// component
		&.expanded {
			width: 100%;
			height: 100%;
			padding: 0.5em;
			border-style: dashed;
			gap: 0.5em;

			.icon {
				font-size: 5rem;
			}
		}

		// BG
		.whole {
			height: 100%;
			width: 100%;
			display: block;

			// open props
			border-radius: var(--radius-3);
			padding: var(--size-fluid-3);
			box-shadow: var(--shadow-2);

			&:hover {
				box-shadow: var(--shadow-3);
			}

			@media (--motionOK) {
				animation: var(--animation-fade-in);
			}
		}
	}
</style>
