<svelte:options accessors />

<script lang="ts">
	//#region imports
	import Connection from './Connection.svelte'
	import CreateConnections from './CreateConnections.svelte'
	import { DrawflowStore, getContext, nodeBG } from '../../cmp/store'
	import { nodeTransition, receive, send } from './transition'
	import SvelteQueryProvider from '$lib/api/svelte-query/SvelteQueryProvider.svelte'
	import Editor from '$cmp/text-editor/svnotion/editor/index.svelte'
	import { createTiptapContent } from '$cmp/text-editor/tiptap/extension/parse'
	import { items, type TItemCtx, type ItemSlot } from '$cmp/drawflow/cmp/ctx'
	import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'
	import type { Actions, DataNode } from '.'
	import type { Task } from '$cmp/drawflow/lib/task'
	import { zIndex } from './store'
	import InlineProcess from '$cmp/providers/InlineProcess.svelte'
	//#endregion

	export let actions: Actions

	export let node: Omit<DrawflowNode, 'inputs' | 'outputs'> & {
		inputs: n
		outputs: n
	}
	export let dataNode: DataNode | undefined = undefined
	export let task: ReturnType<typeof Task> | undefined = undefined

	export let out = {
		// connections
		inputs: <DrawflowNode['inputs']>{},
		outputs: <DrawflowNode['outputs']>{},
		// elements
		drawflowContentNode: <HTMLElement | undefined>undefined,
		drawflowParentNode: <HTMLElement | undefined>undefined,
	}

	// @ts-ignore
	const Slot: ItemSlot | undefined = items.find(
		o => o.GraphNodeID == node.html
	)
	let GraphNodeID = Slot?.GraphNodeID as TItemCtx['GraphNodeID'] | undefined
	let id = node.id

	export let content = $DrawflowStore.editor.getNodeFromId?.(id)?.data.content

	if (!content && GraphNodeID) {
		content = createTiptapContent(GraphNodeID, node.data.props ?? {})
	}

	let _zIndex = ($zIndex += 1)
	const position = () => {
		_zIndex = $zIndex += 1
	}
	let asyncSubComponent = Slot?.provider && !!content
</script>

<div
	class="parent-node"
	bind:this={out.drawflowParentNode}
	on:wheel|preventDefault|stopPropagation>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		id="node-{id}"
		class="drawflow-node template selected {node.class}"
		style:z-index={_zIndex}
		style="top: {node.pos_y}px; left: {node.pos_x}px; background-color: {$nodeBG}; z-index: {_zIndex};"
		on:click={position}>
		{#if dataNode}
			<CreateConnections {dataNode} />
		{:else}
			<!-- prettier-ignore -->
			<Connection type="input" rows={node.inputs} bind:json={out.inputs} />
		{/if}
		<div class="drawflow_content_node" bind:this={out.drawflowContentNode}>
			<div class="drawflow_node_top">
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
				<span class="drawflow_node_title title-box"
					>{`Node: ${Slot?.title} ${id}`}</span>
			</div>

			<!-- https://github.com/sveltejs/svelte/issues/6037#issuecomment-789286616 -->
			<!-- https://svelte.dev/repl/f9cc573c14a943098f68964dc5496fd7?version=3.31.2 -->
			<div class="drawflow_node_body">
				{#if $nodeTransition.id != id}
					<div in:receive={{ key: id }} out:send={{ key: id }}>
						<SvelteQueryProvider async={asyncSubComponent}>
							<Editor {content} {actions} />
							{@const _ = task?.resolve('LoadedSubComponent')}
						</SvelteQueryProvider>
					</div>
				{/if}
			</div>
		</div>
		<Connection type="output" rows={node.outputs} bind:json={out.outputs} />
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

    .drawflow_node_body h1 {
        margin-top: 8px;
        margin-bottom: 10px;
        font-size: 35px;
    }
    
    .drawflow_node_body p {
        margin-top: 8px;
        margin-bottom: 8px;
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
