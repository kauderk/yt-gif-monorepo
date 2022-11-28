<svelte:options accessors />

<script lang="ts">
	import { onMount } from 'svelte'
	import Connection, { type Tconection } from './Connection.svelte'
	import CreateConnections from './CreateConnections.svelte'
	import { nodeBG } from '../../cmp/store'
	import { nodeTransition, receive, send } from './transition'
	import { items } from '$cmp/drawflow/cmp/ctx'
	import type { ID } from '$cmp/drawflow/src/drawflow/types'

	export let id: ID
	export let className = ''
	export let GraphNodeID = ''

	export let top: number
	export let left: number

	export let inputs: Tconection
	export let outputs: Tconection

	export let content: HTMLElement
	export let parent: HTMLElement

	/**
	 * if provided, it will create conections,
	 * it must be a companion to
	 * @example
	 * outputs.length = Object.keys(dataNode.outputs).length
	 */
	export let dataNode: any = undefined

	onMount(() => dataNode?.task.resolve())

	const ComponentSlot = items.find(o => o.GraphNodeID == GraphNodeID)?.cmp
</script>

<div
	class="parent-node"
	bind:this={parent}
	on:wheel|preventDefault|stopPropagation>
	<div
		id="node-{id}"
		class="drawflow-node template selected {className}"
		style="top: {top}px; left: {left}px; background-color: {$nodeBG};">
		{#if dataNode}
			<CreateConnections {dataNode} />
		{:else}
			<Connection {...inputs} bind:json={inputs.json} />
		{/if}
		<div class="drawflow_content_node" bind:this={content}>
			<button
				aria-label="Open/Close modal"
				on:click={() =>
					($nodeTransition = {
						id,
						prev: id,
						GraphNodeID,
						state: 'modal',
					})}>
				<i class="fa-solid fa-x" />
			</button>

			<!-- https://github.com/sveltejs/svelte/issues/6037#issuecomment-789286616 -->
			<!-- https://svelte.dev/repl/f9cc573c14a943098f68964dc5496fd7?version=3.31.2 -->
			<div>
				{#if $nodeTransition.id != id && ComponentSlot}
					<div in:receive={{ key: id }} out:send={{ key: id }}>
						<svelte:component this={ComponentSlot} />
					</div>
				{/if}
			</div>
		</div>
		<Connection {...outputs} bind:json={outputs.json} />
	</div>
</div>

<style lang="scss" global>
	// node
	.drawflow-node {
		// coordinates
		position: absolute;
		display: flex;

		// relative to siblings
		align-items: center; // conections Y-axis
		z-index: 2; // infront of conections

		// theme
		color: white;
		border-radius: 0.5em;

		// contrast
		backdrop-filter: blur(4px);
		box-shadow: 0px 2px 15px 2px rgba(71, 71, 71, 0.123);

		background-color: #27282c !important;

		&:hover {
			cursor: move;
			background: rgba(131, 131, 131, 0.575);
			&.selected {
				background: rgba(131, 131, 131, 0.788);
			}
			& .output:hover {
				background: rgb(131, 131, 131);
			}
			.title-box {
				background-color: rgba(139, 139, 139, 0.692);
			}
		}
	}

	.drawflow_content_node {
		width: -webkit-fill-available;
	}

	// runtime
	.drawflow-delete {
		position: absolute;
		display: block;
		width: 30px;
		height: 30px;

		z-index: 4;

		line-height: 30px;
		font-weight: 700;
		text-align: center;
		border: 1px solid solid;
		border-radius: 50%;
		font-family: monospace;
		cursor: pointer;

		margin-left: -15px;
		margin-top: 15px;

		right: -15px;
		top: -15px;

		color: white;
		background: black;
	}
</style>
