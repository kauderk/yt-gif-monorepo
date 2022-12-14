<script lang="ts" context="module">
	import type { ID } from '$cmp/drawflow/src/drawflow/types'
	import { isActive } from './store'

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
	import type FolderView from './FolderView.svelte'
	import FileAction from './FileAction.svelte'

	export let query: ReturnType<FolderView['query']>
	$: name = query.name
</script>

<div class="controls">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={query.actions.focus}
		class="badge"
		class:active={$isActive === name}>
		{name}
	</div>

	<span class="actions dark">
		<FileAction
			iconName="diagram-nested"
			active={$isActive == name}
			on:click={query.actions.expandSimilar} />
		<FileAction
			iconName="chart-gantt"
			active={$isActive == name}
			on:click={query.actions.expandAncestors} />
		<FileAction
			iconName="xmark"
			active={$isActive == name}
			on:click={query.actions.delete} />
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

	.badge {
		cursor: help;
	}
	.active {
		color: orange;
		font-weight: bold;
	}
</style>
