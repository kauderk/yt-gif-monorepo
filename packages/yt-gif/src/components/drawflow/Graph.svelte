<script lang="ts">
	import Drawflow from './src/drawflow'
	import dataToImport from './data.json'

	import { undoRedo } from './plugins/conection-undo-redo'
	import { rerouteSquare } from './plugins/reroute-square'
	import { dragAndDrop, AssignEvents } from './plugins/drag-drop'
	import { selectMultiple } from './plugins/select-mulitple'
	import { multiDrag } from './plugins/multi-drag'
	import { draggableCancelation } from './plugins/draggable-cancelation'
	import { zoomToPointer } from './plugins/zoom-to-pointer'
	import { createAddNode } from './plugins/add-node-svelte'
	import { DrawflowMinimap } from './plugins/minimap'

	import Views from './cmp/views/index.svelte'
	import Canvas from './cmp/Canvas.svelte'
	import {
		createNodeComponents,
		registerNodeComponents,
	} from './cmp/blocks/registration'
	import Minimap from './cmp/Minimap.svelte'

	import { onMount, setContext } from 'svelte'
	import { DefaultProps, DrawflowStore as ctx } from './cmp/store'
	import { writable } from 'svelte/store'
	import type { EventNames } from './src/drawflow/events'
	import { listenAndRefreshEditor } from './lib/refresh'

	// REACTIVE Definitions
	setContext('DrawflowStore', ctx)
	let flush: (() => void)[] = []

	export let props = DefaultProps
	setContext('DrawflowProps', writable(props))

	onMount(async () => {
		//
		$ctx.editor = new Drawflow($ctx.drawflowRoot)

		// modify the API to work with svelte components
		const { addNode, addNodeImport } = createAddNode.bind(
			Drawflow.prototype
		)(flush)

		Drawflow.prototype.addNode = addNode
		Drawflow.prototype.addNodeImport = addNodeImport

		// -------- PLUGINGS --------
		// UndoRedo
		flush.push(undoRedo($ctx.editor).createListeners)

		// square conections/links
		// rerouteSquare($ctx.editor)

		// drag and drop
		$ctx.dnd = dragAndDrop($ctx.editor)

		// shift key selection
		selectMultiple($ctx.editor)

		// mimimap
		// new DrawflowMinimap($ctx.minimap, $ctx.editor, 0.05)
		flush.push(draggableCancelation($ctx.editor).createListeners)

		// zoom
		zoomToPointer($ctx.editor)

		// kickstart API
		await $ctx.editor.start()

		registerNodeComponents($ctx.editor)

		// add HTML nodes
		await $ctx.editor.import(dataToImport)

		//createNodeComponents($ctx.editor)

		listenAndRefreshEditor(
			ctx,
			() => ($ctx.editor.drawflow = $ctx.editor.drawflow)
		)

		// multi drag after load
		$ctx.mul = multiDrag($ctx.editor)

		return flush.map(create => create())
	})
	function exportGraph() {
		console.log(JSON.stringify($ctx.editor.export()))
	}
</script>

<svelte:window on:keydown={e => e.key == 'e' && e.altKey && exportGraph()} />

<div class="wrapper">
	<Views />
	<Canvas />
	<Minimap />
</div>

<style global lang="scss">
	@import '../../styles/open-props.scss';
</style>
