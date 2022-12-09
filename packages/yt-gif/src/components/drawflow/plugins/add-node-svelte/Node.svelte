<svelte:options accessors />

<script lang="ts">
	import { onMount } from 'svelte'
	import Connection, { type Tconection } from './Connection.svelte'
	import CreateConnections from './CreateConnections.svelte'
	import { nodeBG } from '../../cmp/store'
	import { nodeTransition, receive, send } from './transition'
	import { items } from '$cmp/drawflow/cmp/ctx'
	import type { ID } from '$cmp/drawflow/src/drawflow/types'
	import SvelteQueryProvider from '$lib/api/svelte-query/SvelteQueryProvider.svelte'
	import Editor from '$cmp/text-editor/svnotion/editor/index.svelte'

	export let id: ID
	export let className = ''

	export let GraphNodeID = ''
	export let GraphNodeProps = {}

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

	//onMount(() => {()})

	const Slot = items.find(o => o.GraphNodeID == GraphNodeID)

	var classTopName = 'drawflow_node_top'
	var classBodyName = ''
	if (Slot?.GraphNodeID == 'InputBlock') {
		classTopName = 'top_cyan'
		classBodyName = 'body_cyan'
	} else if (Slot?.GraphNodeID == 'TitleNoteBlock') {
		classTopName = 'top_blue'
		classBodyName = 'body_blue'
	}
	const props = { ...GraphNodeProps, GraphNodeID, id }
</script>

<div
	class="parent-node"
	bind:this={parent}
	on:wheel|preventDefault|stopPropagation>
	<div
		id="node-{id}"
		class="drawflow-node template selected {className} {classBodyName}"
		style="top: {top}px; left: {left}px; background-color: {$nodeBG};">
		{#if dataNode}
			<CreateConnections {dataNode} />
		{:else}
			<Connection {...inputs} bind:json={inputs.json} />
		{/if}
		<div class="drawflow_content_node" bind:this={content}>
			<div class="drawflow_node_top {classTopName}">
				<button
					aria-label="Open/Close modal"
					on:click={() =>
						($nodeTransition = {
							id,
							prev: id,
							GraphNodeID,
							state: 'modal',
						})}>
					<i class="fa-solid fa-x" style="font-size: 12px;" />
				</button>
				<span class="drawflow_node_title"
					>{Slot?.title ?? `Node: ${id}`}</span>
			</div>

			<!-- https://github.com/sveltejs/svelte/issues/6037#issuecomment-789286616 -->
			<!-- https://svelte.dev/repl/f9cc573c14a943098f68964dc5496fd7?version=3.31.2 -->
			<div class="drawflow_node_body">
				{#if $nodeTransition.id != id && Slot?.cmp}
					<div in:receive={{ key: id }} out:send={{ key: id }}>
						<SvelteQueryProvider async={Slot.provider}>
							<Editor {...props} />
							{@const _ = dataNode?.task.resolve()}
						</SvelteQueryProvider>
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
		box-shadow: 4px 6px 10px 2px rgba(0, 0, 0, 0.434);

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

	.drawflow_node_top {
		border-radius: 0.5em 0.5em 0 0;
		background-color: #1a1a1a;
		padding: 5px;
	}

	.top_blue {
		background-color: #0081ae !important;
	}

	.body_blue {
		background-color: #00a6da !important;
	}

	.top_cyan {
		background-color: #00b2b3 !important;
	}

	.body_cyan {
		background-color: #00d9da !important;
	}

	.drawflow_node_title {
		font-weight: 600;
		margin-left: 5px;
	}

	.drawflow_node_body {
		padding: 10px;
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
