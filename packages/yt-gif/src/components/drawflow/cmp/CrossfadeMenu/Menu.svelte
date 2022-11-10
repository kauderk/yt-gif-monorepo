<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import type { TItem } from './store'

	const [send, receive] = crossfade({ duration: 500 })

	let opened: TItem | null
</script>

{#key opened}
	{#if !opened}
		<Grid
			{send}
			{receive}
			on:click={event => (opened = event.detail.item)} />
	{:else}
		<Expanded {send} {receive} {opened} on:click={() => (opened = null)} />
	{/if}
{/key}
