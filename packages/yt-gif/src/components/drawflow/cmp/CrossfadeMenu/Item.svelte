<script lang="ts">
	import { ScaleToFitParent } from '$cmp/stand-alone/ScaleToFitParent'
	import Drag from '../blocks/Drag.svelte'
	import { getContext } from '../store'
	import Controls from './controls/Controls.svelte'

	export let hue = 0
	export let icon = 'info'
	export let cmp: any = null
	export let GraphNodeID: string = 'missing'
	export let title = ''
	export let type: ('draggable' | 'label' | 'component' | 'expanded')[]

	const ctx = getContext()

	$: component = type.includes('component')
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="item "
	class:expanded={type.includes('expanded')}
	class:component
	draggable="false"
	style="--hue: {hue}"
	on:click>
	<div class="controls">
		{#if type.includes('label')}
			<!-- top-picker -->
			<Drag {...$ctx.dnd} name={GraphNodeID}>
				<span class="top-picker">
					<span class="title">{title}</span>
					<i class="icon material-icons">{icon}</i>
				</span>
			</Drag>
		{:else if component}
			<!-- bottom-component -->
			<Controls />
		{/if}
	</div>
	<main class="s-scrollbar">
		{#if component}
			<!-- bottom-component -->
			<div class="draggable-component-container">
				<Drag {...$ctx.dnd} name={GraphNodeID}>
					<svelte:component this={cmp} />
				</Drag>
			</div>
		{/if}
	</main>
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

		padding: 0.5em;

		&:not(.component) {
			width: auto;
			height: 2em;
			.top-picker {
				user-select: none;

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
			gap: 0.5em;
			// because it's absolute, start counting with the additional padding
			// make it even by shaving it off
			width: calc(24.25em - 0.5em);
			main {
				overflow-x: auto;
			}
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
