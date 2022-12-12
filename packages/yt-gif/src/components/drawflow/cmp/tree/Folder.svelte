<script lang="ts">
	import { isActive } from './store'
	import File, { type TFile } from './File.svelte'
	import { setContext } from 'svelte'

	export let expanded = false
	export let name: string
	export let children: TFile[]

	function toggle(e: MouseEvent) {
		expanded = !expanded
		activate(name)
	}

	function activate(event: s) {
		console.log(event)
		$isActive = event
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class:expanded on:click={toggle}
	><File {name} isActive={$isActive} /></span>

{#if expanded}
	<ul>
		{#each children as nested}
			<li>
				{#if nested.children?.length}
					<svelte:self {...nested} />
				{:else}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div on:click={() => activate(nested.name)}>
						<File {...nested} isActive={$isActive} />
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	span {
		padding: 0 0 0 1.5em;
		background: url(./icons/folder.svg) 0 0.1em no-repeat;
		background-size: 1em 1em;
		font-weight: bold;
		cursor: pointer;
	}

	.expanded {
		background-image: url(./icons/folder-open.svg);
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
