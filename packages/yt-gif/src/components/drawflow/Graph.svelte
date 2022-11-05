<script lang="ts">
	import Drawflow from 'drawflow'
	import dataToImport from './data.json'

	import createUndoRedo from './plugins/conection-undo-redo'
	import rerouteSquare from './plugins/reroute-square'
	import createDragDrop, { AssignEvents } from './plugins/drag-drop'
	import selectMultiple from './plugins/select-mulitple'
	import multiDrag from './plugins/multi-drag'

	import Sidebar from './cmp/Sidebar.svelte'
	import Canvas from './cmp/Canvas.svelte'
	import Footer from './cmp/Footer.svelte'

	import { onMount } from 'svelte'
	import { setContext } from 'svelte'
	import { DrawflowStore as ctx } from './cmp/store'

	// REACTIVE Definitions
	setContext('DrawflowStore', ctx)

	onMount(() => {
		// @ts-ignore
		$ctx.editor = new Drawflow($ctx.drawflowRoot)

		// -------- PLUGINGS --------
		// UndoRedo
		const { createListeners } = createUndoRedo($ctx.editor)
		// square conections/links
		rerouteSquare($ctx.editor)
		// drag and drop
		$ctx.dnd = createDragDrop($ctx.editor)
		AssignEvents($ctx.templateDragableRoot, $ctx.dnd)
		// @ts-ignore shift key selection
		selectMultiple($ctx.editor)

		// kickstart API
		$ctx.editor.start()

		// add HTML nodes
		$ctx.editor.import(dataToImport)

		// @ts-ignore multi drag after load
		$ctx.mul = multiDrag($ctx.editor)

		return createListeners()
	})
</script>

<div class="wrapper">
	<Sidebar />
	<div class="col-right">
		<Canvas>
			<Footer />
		</Canvas>
	</div>
</div>
