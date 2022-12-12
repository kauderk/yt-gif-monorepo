<script lang="ts" context="module">
	import type { ID } from '$cmp/drawflow/src/drawflow/types'
	import { getNodeByID } from '$v3/lib/data/proxy/data'
	import { get } from 'svelte/store'
	import { getContext } from '../store'

	type base = {
		name: string
		id?: ID
		expanded?: boolean
	}
	type folder = base & {
		children?: undefined
	}
	export type TFile =
		| (base & {
				children: (
					| (base & {
							children: base[]
					  })
					| folder
				)[]
		  })
		| folder
</script>

<script lang="ts">
	export let isActive = ''
	$: type = name.slice(name.lastIndexOf('.') + 1)

	import type FolderView from './FolderView.svelte'

	export let query: ReturnType<FolderView['query']>
	$: name = query.name

	export let expandSimilar: () => void
	export let expandAncestors: () => void

	const outline = (b: b) => (b ? 'duotone' : 'thin')

	const ctx = getContext()
	const focusCanvasOnNode = () => {
		const node = getNodeByID({ uid: query.id, module: 'Home' })
		if (!node) return console.log('Unable to Focus on node')

		//const size = window.getComputedStyle($ctx.editor.precanvas!)

		//let x = node.pos_x + parseFloat(size.width) / 2
		//let y = node.pos_y - parseFloat(size.height) / 3.15

		//let x = node.pos_x + 600
		//let y = node.pos_y - 300

		// let x = $ctx.editor.canvas_x + node.pos_x
		// let y = $ctx.editor.canvas_y + node.pos_y

		$ctx.editor.canvas_x = node.pos_x
		$ctx.editor.canvas_y = node.pos_y
		$ctx.editor.zoom_refresh()
		//zoom = get(ctx).editor.zoom
	}
</script>

<span class="node">
	<span class="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandSimilar}
			class="fa-{outline(isActive === name)} fa-diagram-nested" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandAncestors}
			class="fa-{outline(isActive === name)} fa-chart-gantt" />
	</span>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		on:click={focusCanvasOnNode}
		class="title"
		class:active={isActive === name}>
		{name}
	</span>
</span>

<style>
	* {
		user-select: none;
	}

	.title {
		cursor: help;
	}
	.active {
		color: orange;
		font-weight: bold;
	}
</style>
