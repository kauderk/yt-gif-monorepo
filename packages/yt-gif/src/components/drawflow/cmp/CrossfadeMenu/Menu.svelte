<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import Grid from './Grid.svelte'
	import Expanded from './Expanded.svelte'
	import { itemHistory, opened } from './store'
	import { onMount } from 'svelte'
	import { items, type Scroller } from '../ctx'

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

	import { writable } from 'svelte/store'

	function chunk<T, N extends number>(array: T[], chunkSize: N): T[][] {
		const R = []
		for (let i = 0, len = array.length; i < len; i += chunkSize)
			R.push(array.slice(i, i + chunkSize))
		return R
	}

	let LevelsOfItems = chunk(items, items.length / 3)
	let scrollValues = writable(
		LevelsOfItems.map(
			() =>
				<Scroller>{
					scrollLeft: 0,
					scrollTop: 0,
					deltaY: 0,
				}
		)
	)
</script>

{#if !$opened}
	<div class="layout">
		<Grid
			{send}
			{receive}
			on:click={event => ($opened = event.detail.item)} />
	</div>
{:else}
	<div class="layout">
		<Expanded
			bind:LevelsOfItems
			bind:scrollValues
			{send}
			{receive}
			opened={$opened}
			on:click={event => ($opened = event.detail.item)} />
	</div>
{/if}

<style lang="scss">
	.layout {
		width: 100%;
		position: absolute;
		// horizontal scrollable component won't work with flex
		// display: flex;
		justify-content: start;
		// padding: 0.5rem;

		// horizontal
		flex-direction: column;
		align-items: center;
		align-content: center;
	}
</style>
