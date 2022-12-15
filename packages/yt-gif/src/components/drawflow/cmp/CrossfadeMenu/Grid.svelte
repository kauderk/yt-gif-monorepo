<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { flip } from 'svelte/animate'
	import Item from './Item.svelte'
	import { defCrossfade, getContext, type TItems } from './store'

	const items = getContext()
	export let [send, receive] = defCrossfade

	const dispatch = createEventDispatcher()
</script>

<div class="crossfade-container">
	<main class="relative">
		{#each items as item (item.id)}
			<div
				class="crossfade"
				in:receive={{ key: item.id }}
				out:send={{ key: item.id }}
				animate:flip>
				<Item
					hue={item.id * 35}
					{...item}
					type={['label', 'draggable']}
					on:click={() => dispatch('click', { item })} />
			</div>
		{/each}
	</main>
</div>

<style lang="scss">
	.crossfade-container > main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		padding: 0.5em;
	}
</style>
