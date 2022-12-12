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
	export let title = ''

	const ctx = getContext()
	$: component = expanded && cmp
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="item s-scrollbar"
	class:expanded
	style="--hue: {hue}"
	class:component
	on:click>
	<div class="controls">
		{#if !component}
			<!-- top-picker -->
			<span class="top-picker">
				<span class="title">{title}</span>
				<i class="icon material-icons">{icon}</i>
			</span>
		{:else}
			<!-- bottom-component -->
			<Controls />
		{/if}
	</div>
	{#if expanded}
		{#if !cmp}
			<!-- top-picker -->
			<slot />
		{:else}
			<!-- bottom-component -->
			<div class="draggable-component-container">
				<Drag {...$ctx.dnd} name={GraphNodeID}>
					<svelte:component this={cmp} />
				</Drag>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;

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

		padding: 0.5em;

		&:not(.component) {
			width: auto;
			height: 2em;
			.top-picker {
				display: flex;
				.title {
					font-size: medium;
				}
			}
			&:hover {
				background-color: hsl(var(--hue), 100%, 40%);
				border-color: hsl(var(--hue), 100%, 40%);
				color: hsl(var(--hue), 100%, 95%);
			}
		}
		&.component {
			width: 380px;
			overflow-x: auto;
			gap: 0.5em;
		}
		&.expanded {
			border-style: dashed;
		}

		// BG
		.draggable-component-container {
			// open props
			border-radius: var(--radius-3);

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
