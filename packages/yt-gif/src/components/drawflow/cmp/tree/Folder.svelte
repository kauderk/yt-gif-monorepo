<script lang="ts">
	import File from './File.svelte'
	import { Subscribe } from 'svelte-subscribe'
	import type FolderView from './FolderView.svelte'
	import { activate } from './store'

	export let query: ReturnType<FolderView['query']>
	export let children: FolderView['children']

	function toggle(e: any) {
		query.expanded.setFrom(b => !b)
		activate(query.name)
	}
</script>

<Subscribe expanded={query.expanded} let:expanded>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="controls">
		<span class="actions">
			<i
				on:click={toggle}
				class="fa-solid fa-chevron-{expanded ? 'down' : 'right'}" />
		</span>

		<File {query} />
	</div>

	<!-- children -->
	{#if expanded}
		<ul>
			{#each children as nested}
				<li>
					{#if nested.children?.length}
						<svelte:self
							query={{ ...nested }}
							children={nested.children} />
					{:else}
						<File query={nested} />
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</Subscribe>

<style lang="scss">
	* {
		user-select: none;
	}
	.controls {
		display: flex;
		gap: 0.5em;
	}
	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}
</style>
