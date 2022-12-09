<script lang="ts">
	import Drawflow from './src/drawflow'
	import dataToImport from './data.json'

	import { createAddNode } from './plugins/add-node-svelte'

	import Canvas from './cmp/Canvas.svelte'
	import {
		createNodeComponents,
		registerNodeComponents,
	} from './cmp/blocks/registration'

	import { onMount, setContext } from 'svelte'
	import { DefaultProps, DrawflowStore as ctx } from './cmp/store'
	import { writable } from 'svelte/store'

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

		// kickstart API
		await $ctx.editor.start()

		registerNodeComponents($ctx.editor)

		// add HTML nodes
		await $ctx.editor.import(dataToImport)

		//createNodeComponents($ctx.editor)

		return flush.map(create => create())
	})
	function exportGraph() {
		console.log(JSON.stringify($ctx.editor.export()))
	}
</script>

<svelte:window on:keydown={e => e.key == 'e' && e.altKey && exportGraph()} />

<div class="wrapper">
	<Canvas />
</div>

<style global lang="scss">
	@import '../../styles/open-props.scss';
</style>
