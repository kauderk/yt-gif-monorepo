<script lang="ts">
	import Drawflow from 'drawflow'
	import dataToImport from './data.json'

	import UndoRedo from './plugins/conection-undo-redo'
	import rerouteSquare from './plugins/reroute-square'
	import createDragDrop, { AssignEvents } from './plugins/drag-drop'
	import selectMultiple from './plugins/select-mulitple'
	import multiDrag from './plugins/multi-drag'
	import draggableCancelation from './plugins/draggable-cancelation'

	import Sidebar from './cmp/Sidebar.svelte'
	import Canvas from './cmp/Canvas.svelte'
	import Footer from './cmp/Footer.svelte'

	import { onMount } from 'svelte'
	import { setContext } from 'svelte'
	import { DrawflowStore as ctx } from './cmp/store'
	import { DrawflowMinimap } from './plugins/minimap'

	// REACTIVE Definitions
	setContext('DrawflowStore', ctx)
	let flush: Function[] = []

	onMount(() => {
		// @ts-ignore
		$ctx.editor = new Drawflow($ctx.drawflowRoot)

		// -------- PLUGINGS --------
		// UndoRedo
		flush.push(UndoRedo($ctx.editor).createListeners)

		// square conections/links
		rerouteSquare($ctx.editor)

		// drag and drop
		$ctx.dnd = createDragDrop($ctx.editor)
		AssignEvents($ctx.templateDragableRoot, $ctx.dnd)

		// @ts-ignore shift key selection
		selectMultiple($ctx.editor)

		// mimimap
		new DrawflowMinimap($ctx.minimap, $ctx.editor, 0.05)
		// @ts-ignore
		flush.push(draggableCancelation($ctx.editor).createListeners)

		// kickstart API
		$ctx.editor.start()

		// add HTML nodes
		$ctx.editor.import(dataToImport)

		// @ts-ignore multi drag after load
		$ctx.mul = multiDrag($ctx.editor)

		return flush.map(create => create())
	})
</script>

<div class="wrapper">
	<Sidebar />
	<div class="col-right">
		<Canvas>
			<Footer />
		</Canvas>
		<div><div id="minimap" bind:this={$ctx.minimap} /></div>
	</div>
</div>

<style global>
	#drawflow {
		position: relative;
		width: 800px;
		height: 800px;
		border: 1px solid red;
	}

	#minimap {
		border: 1px solid red;
		width: 150px;
		height: 150px;
		position: absolute;
		top: 67px;
		left: 820px;
		cursor: move;
	}
	#minimap * {
		cursor: move;
		pointer-events: none;
	}

	#minimap .mask {
		border: 1px solid red;
		border-radius: 4px;
		position: absolute;
		background: rgb(245, 111, 111);
		opacity: 0.3;
		pointer-events: none;
	}
</style>
