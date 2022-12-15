<script lang="ts">
	import { DrawflowStore } from '$cmp/drawflow/cmp/store'
	import type { Content } from '@tiptap/core'

	const addNode = (content?: Content) => {
		$DrawflowStore.editor
			.addNode({
				// connections
				inputs: 1,
				outputs: 1,

				// coordinates
				pos_y: 150,
				pos_x: 600,

				data: {
					content,
				},
				// node
				name: 'graph-node',
				class: 'graph-node',
				html: '',
				typenode: 'svelte',
			})
			.catch(console.log)
	}

	export let left: s
	export let top: s
	export let zIndex: n
	export let placement: 'node' | 'canvas'
</script>

<div id="contextmenu" style:left style:top style:z-index={zIndex}>
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		{#if placement == 'node'}
			<li class="menu-title">
				<span>Nodes</span>
			</li>
			<li>
				<button on:click={() => addNode()}
					><span>Add Empty Node</span></button>
			</li>
			<li><span>Generate content</span></li>
		{/if}
		{#if placement == 'canvas'}
			<li class="menu-title">
				<span>Canvas</span>
			</li>
			<li>
				<button
					on:click={async () => {
						const content = await navigator.clipboard.readText()
						addNode(content)
					}}>Add Node from Clipboard</button>
			</li>
			<li><span>Search</span></li>
		{/if}
	</ul>
</div>

<style>
	#contextmenu {
		display: flex;
		align-items: center;
		position: absolute;
		background: rgb(50, 50, 50);
		color: white;
		border: 2px solid black;
		padding: 10px;
		z-index: 10;
	}
</style>
