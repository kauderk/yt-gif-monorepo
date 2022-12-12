<script lang="ts">
	import { isActive } from './store'
	import File, { type TFile } from './File.svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import type FolderView from './FolderView.svelte'

	export let expanded = writable(false)
	export let name: string
	export let id: TFile['id'] = undefined
	export let children: FolderView['children']

	function toggle(e: MouseEvent) {
		$expanded = !$expanded
		activate(name)
	}

	function activate(event: s) {
		console.log(event)
		$isActive = event
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="controls">
	<span class="actions">
		<i
			on:click={toggle}
			class="expand fa-solid fa-chevron-{$expanded ? 'down' : 'right'}" />
	</span>

	<File
		{id}
		{name}
		isActive={$isActive}
		expandSimilar={() => activate(name)}
		expandAncestors={() => activate(name)} />
</span>

<!-- children -->
{#if $expanded}
	<ul>
		{#each children as nested}
			<li>
				{#if nested.children?.length}
					<svelte:self {...nested} />
				{:else}
					<File
						{...nested}
						isActive={$isActive}
						expandSimilar={() => activate(nested.name)}
						expandAncestors={() => activate(name)} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

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
