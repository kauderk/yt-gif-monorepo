<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import MenuLayout1 from './MenuLayout1.svelte'
	import MenuLayout2 from './MenuLayout2.svelte'
	import type { TItem } from './store'

	const [send, receive] = crossfade({ duration: 500 })

	let opened: TItem | null
</script>

{#key opened}
	{#if !opened}
		<MenuLayout1
			{send}
			{receive}
			on:click={event => (opened = event.detail.item)} />
	{:else}
		<MenuLayout2
			{send}
			{receive}
			{opened}
			on:click={() => (opened = null)} />
	{/if}
{/key}
