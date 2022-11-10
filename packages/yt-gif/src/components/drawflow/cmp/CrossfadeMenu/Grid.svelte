<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { flip } from 'svelte/animate'
	import Item from './Item.svelte'
	import { defCrossfade, getContext, type TItems } from './store'

	const items = getContext()
	export let [send, receive] = defCrossfade

	const dispatch = createEventDispatcher()
</script>

<div class="layout-1">
	<div class="menu">
		{#each items as item (item.id)}
			<div
				class="item"
				in:receive={{ key: item.id }}
				out:send={{ key: item.id }}
				animate:flip>
				<Item
					hue={item.id * 35}
					icon={item.icon}
					cmp={item.cmp}
					on:click={() => dispatch('click', { item })} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.layout-1 {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		> .menu {
			display: grid;
			grid-template-rows: repeat(3, auto);
			grid-template-columns: repeat(3, 1fr);
			justify-items: center;
			align-items: center;
			gap: 0.5em;
		}
	}
</style>
