<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import { itemHistory, opened } from './store'
	import { onMount } from 'svelte'
	import { items } from '../ctx'

	const [send, receive] = crossfade({ duration: 500 })

	onMount(() => {
		const localUnSub = itemHistory.useLocalStorage() // read data
		$opened = items.find(o => o.id == $itemHistory.previous.id) // assign
		const sessionUbSub = opened.subscribe(() => {
			$itemHistory.previous.id = $opened?.id // react to it
		})
		return () => {
			// cleanup
			sessionUbSub()
			localUnSub()
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
