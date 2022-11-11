<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import { itemHistory } from './store'
	import { onMount } from 'svelte'
	import { type TItemCtx, items } from './ctx'

	const [send, receive] = crossfade({ duration: 500 })

	let opened: TItemCtx | null
	$: if (opened) {
		$itemHistory.current.id = opened?.id
	}
	$: console.log($itemHistory.current.id)

	onMount(() => {
		opened = items.find(o => o.id == $itemHistory.current.id)!
	})
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
