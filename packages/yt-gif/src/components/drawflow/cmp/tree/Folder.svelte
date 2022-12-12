<script lang="ts">
	import { isActive } from './store'
	import File from './File.svelte'
	import { Subscribe } from 'svelte-subscribe'
	import type FolderView from './FolderView.svelte'

	export let query: ReturnType<FolderView['query']>
	export let children: FolderView['children']

	function toggle(e: MouseEvent) {
		query.expanded.setFrom(b => !b)
		activate(query.name)
	}

	function activate(event: s) {
		$isActive = event
	}
	$: name = query.name
</script>

<Subscribe expanded={query.expanded} let:expanded>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="controls">
		<span class="actions">
			<i
				on:click={toggle}
				class="expand fa-solid fa-chevron-{expanded
					? 'down'
					: 'right'}" />
		</span>

		<File
			{query}
			isActive={$isActive}
			expandSimilar={() => activate(name)}
			expandAncestors={() => activate(name)} />
	</span>

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
						<File
							query={nested}
							isActive={$isActive}
							expandSimilar={() => activate(nested.name)}
							expandAncestors={() => activate(name)} />
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
