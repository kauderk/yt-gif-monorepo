<script lang="ts">
	import { DrawflowBlocks } from '$cmp/drawflow/cmp/blocks'
	import { DrawflowStore } from '$cmp/drawflow/cmp/store'
	const addNode = () => {
		$DrawflowStore.editor
			.addNode({
				// connections
				inputs: 1,
				outputs: 1,

				// coordinates
				pos_y: 150,
				pos_x: 600,

				data: {},
				// node
				name: 'graph-node',
				class: 'graph-node',
				html: DrawflowBlocks.SimpleBlock.GraphNodeID,
				typenode: 'svelte',
			})
			.catch(console.log)
	}
	export let left: s
	export let top: s
	export let zIndex: n
</script>

<div id="contextmenu" style:left style:top style:z-index={zIndex}>
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		<li class="menu-title">
			<span>Nodes</span>
		</li>
		<li><button on:click={addNode}><span>Add Empty Node</span></button></li>
		<li><span>Item 2</span></li>
		<li class="menu-title">
			<span>Category</span>
		</li>
		<li><span>Item 1</span></li>
		<li><span>Item 2</span></li>
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
