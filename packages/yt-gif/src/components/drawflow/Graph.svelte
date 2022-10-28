<script lang="ts">
	import Drawflow from 'drawflow'
	import Drag from './Drag.svelte'
	import dataToImport from './data.json'
	import createUndoRedo from './plugins/conection-undo-redo'
	import rerouteSquare from './plugins/reroute-square'
	import createDragDrop, { AssignEvents } from './plugins/drag-drop'
	import selectMultiple from './plugins/select-mulitple'
	import multiDrag from './plugins/multi-drag'
	import { lockToggle } from './lib/utils'
	import { onMount } from 'svelte'
	import Nav from './Nav.svelte'

	// REACTIVE Definitions
	let editor: Drawflow & { precanvas: HTMLElement }
	let dnd = <ReturnType<typeof createDragDrop>>{}
	let mul = <ReturnType<typeof multiDrag>>{}
	let drawflowRoot: HTMLElement
	let templateDragableRoot: HTMLElement
	$: _lockToggle = lockToggle(editor)

	onMount(() => {
		// @ts-ignore
		editor = new Drawflow(drawflowRoot)

		// -------- PLUGINGS --------
		// UndoRedo
		const { addListeners, removeListeners } = createUndoRedo(editor)
		// square conections/links
		rerouteSquare(editor)
		// drag and drop
		dnd = createDragDrop(editor)
		AssignEvents(templateDragableRoot, dnd)
		// @ts-ignore shift key selection
		selectMultiple(editor)

		// kickstart API
		editor.start()

		// add HTML nodes
		editor.import(dataToImport)

		// @ts-ignore multi drag after load
		mul = multiDrag(editor)

		addListeners()
		return removeListeners
	})
</script>

<div class="wrapper">
	<div
		class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full">
		<div
			class="focus:outline-none text-left text-white flex justify-between items-center w-full py-5 space-x-14  ">
			<p class="text-sm leading-5 uppercase">Draggable Templates</p>
			<i class={'fab fa-' + 'slack'} />
		</div>
		<div
			class="flex justify-start flex-col w-full md:w-auto items-start pb-1"
			bind:this={templateDragableRoot}>
			{#each ['facebook', 'slack', 'github', 'telegram', 'aws', 'log', 'google', 'email', 'template', 'multiple', 'personalized', 'dbclick'] as name}
				<Drag {name} drag={dnd.drag} />
			{/each}
		</div>
	</div>
	<div style="display: none" class="col" bind:this={templateDragableRoot}>
		{#each ['facebook', 'slack', 'github', 'telegram', 'aws', 'log', 'google', 'email', 'template', 'multiple', 'personalized', 'dbclick'] as name}
			<Drag {name} drag={dnd.drag} />
		{/each}
	</div>
	<div class="col-right">
		<div class="menu">
			<Nav />
		</div>
		<div
			bind:this={drawflowRoot}
			id="drawflow"
			on:drop={dnd.drop}
			on:dblclick={mul.clear_selection}
			on:dragover={dnd.allowDrop}>
			<!-- NODES WILL BE INJECTED HERE -->
			<!-- ... -->
			<!-- Footer alike -->
			<div class="btn-export">Export</div>
			<div class="btn-clear" on:click={editor.clearModuleSelected}>
				Clear
			</div>
			<div class="btn-lock" on:click={_lockToggle}>
				<i class={'fas fa-lock'} />
			</div>
			<div class="bar-zoom">
				<i class="fas fa-search-minus" on:click={editor.zoom_out} />
				<i class="fas fa-search" on:click={editor.zoom_reset} />
				<i class="fas fa-search-plus" on:click={editor.zoom_in} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper,
	.menu {
		background: var(--surface3);
	}
	.col {
		display: flex;
	}

	#drawflow {
		.btn-export {
			border: 1px solid var(--surface3);
			background: var(--surface2);
		}

		.btn-clear {
			border: 1px solid var(--surface3);
			background: var(--surface2);
		}
	}
</style>
