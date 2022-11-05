<script lang="ts">
	import Drawflow from 'drawflow'
	import dataToImport from './data.json'

	import { undoRedo } from './plugins/conection-undo-redo'
	import { rerouteSquare } from './plugins/reroute-square'
	import { dragAndDrop, AssignEvents } from './plugins/drag-drop'
	import { selectMultiple } from './plugins/select-mulitple'
	import { multiDrag } from './plugins/multi-drag'
	import { draggableCancelation } from './plugins/draggable-cancelation'

	import Sidebar from './cmp/Sidebar.svelte'
	import Canvas from './cmp/Canvas.svelte'
	import Footer from './cmp/Footer.svelte'
	import './styles/plugins.css'

	import { onMount } from 'svelte'
	import { setContext } from 'svelte'
	import { DrawflowStore as ctx } from './cmp/store'
	import { DrawflowMinimap } from './plugins/minimap'
	import { zoomToPointer } from './plugins/zoom-to-pointer'

	// REACTIVE Definitions
	setContext('DrawflowStore', ctx)
	let flush: Function[] = []

	onMount(() => {
		// @ts-ignore
		$ctx.editor = new Drawflow($ctx.drawflowRoot)

		// -------- PLUGINGS --------
		// UndoRedo
		flush.push(undoRedo($ctx.editor).createListeners)

		// square conections/links
		rerouteSquare($ctx.editor)

		// drag and drop
		$ctx.dnd = dragAndDrop($ctx.editor)
		AssignEvents($ctx.templateDragableRoot, $ctx.dnd)

		// @ts-ignore shift key selection
		selectMultiple($ctx.editor)

		// mimimap
		new DrawflowMinimap($ctx.minimap, $ctx.editor, 0.05)
		// @ts-ignore
		flush.push(draggableCancelation($ctx.editor).createListeners)

		// @ts-ignore zoom
		zoomToPointer($ctx.editor)

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
