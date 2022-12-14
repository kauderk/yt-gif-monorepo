<script lang="ts" context="module">
	import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'
	import { tryGetStoreNode } from '$v3/lib/data/proxy/data'
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
		const node = tryGetStoreNode({ uid: query.id, module: query.module })
		if (node) {
			$ctx.editor.canvas_x = node.pos_x
			$ctx.editor.canvas_y = node.pos_y
			$ctx.editor.zoom_refresh()
			return
		}
		try {
			$ctx.editor
				.changeModule(query.module)
				.catch(() =>
					console.error(
						'Unable to Focus on node - or - Change Module',
						query
					)
				)
		} catch (error) {}
	}
	const Delete = () => {}
</script>

<div class="controls">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		on:click={focusCanvasOnNode}
		class="title"
		class:active={isActive === name}>
		{name}
	</span>

	<span class="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandSimilar}
			class="fa-{outline(isActive === name)} fa-diagram-nested" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandAncestors}
			class="fa-{outline(isActive === name)} fa-chart-gantt" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i on:click={Delete} class="fa-{outline(isActive === name)} fa-xmark" />
	</span>
</div>

<style lang="scss">
	.controls {
		width: 100%;
		.actions {
			opacity: 0;
		}
		&:hover .actions {
			opacity: 1;
		}
	}
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
