<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import { itemHistory } from './store'
	import { onMount } from 'svelte'

	const [send, receive] = crossfade({ duration: 500 })

	$: opened = $itemHistory.current.item
	onMount(() => itemHistory.useLocalStorage())
</script>

{#key opened}
	{#if !opened}
		<Grid
			{send}
			{receive}
			on:click={event => (opened = event.detail.item)} />
	{:else}
		<Expanded {send} {receive} {opened} />
	{/if}
{/key}
