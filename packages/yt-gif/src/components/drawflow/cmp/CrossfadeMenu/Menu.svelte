<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import { itemHistory, opened } from './store'
	import { onMount } from 'svelte'
	import { items } from './ctx'

	const [send, receive] = crossfade({ duration: 500 })

	onMount(() => {
		const usnsubscriber = itemHistory.useLocalStorage()
		$opened = items.find(o => o.id == $itemHistory.previous.id)
		return () => {
			$itemHistory.previous.id = $opened?.id
			usnsubscriber()
		}
	})
</script>

{#key $opened}
	{#if !$opened}
		<Grid
			{send}
			{receive}
			on:click={event => ($opened = event.detail.item)} />
	{:else}
		<Expanded
			{send}
			{receive}
			opened={$opened}
			on:click={event => ($opened = event.detail.item)} />
	{/if}
{/key}
