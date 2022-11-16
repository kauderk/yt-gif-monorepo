<script lang="ts">
	import { isActive } from './store'
	import File, { type TFile } from './File.svelte'

	export let expanded = false
	export let name: string
	export let files: TFile[]

	function toggle() {
		expanded = !expanded
	}

	function activate(event: s) {
		console.log(event)
		$isActive = event
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class:expanded on:click={toggle}>{name}</span>

{#if expanded}
	<ul>
		{#each files as file}
			<li>
				{#if file.type === 'folder'}
					<svelte:self {...file} />
				{:else}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div on:click={() => activate(file.name)}>
						<File {...file} isActive={$isActive} />
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
