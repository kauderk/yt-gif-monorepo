<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { flip } from 'svelte/animate'
	import Item from './Item.svelte'
	import { defCrossfade, getContext, type TItems } from './store'

	const items = getContext()
	export let [send, receive] = defCrossfade

	const dispatch = createEventDispatcher()
	const getRow = (n: n) => Math.floor(Math.sqrt(n - 1) + 1)

	let rows: TItems[]
	$: rows = Object.values(
		items.reduce((accumulator, item) => {
			const row = getRow(item.id)

			return {
				...accumulator,
				[row]: [...(accumulator[row] || []), item],
			}
		}, {} as typeof rows)
	)
</script>

<div class="layout-1">
	<div class="menu">
		{#each rows as items}
			<div class="row">
				{#each items as item (item.id)}
					<div
						class="item"
						in:receive={{ key: item.id }}
						out:send={{ key: item.id }}
						animate:flip>
						<Item
							hue={item.id * 35}
							icon={item.icon}
							on:click={() => dispatch('click', { item })} />
					</div>
				{/each}
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
		> .menu > .row {
			display: flex;
			justify-content: center;
			&:not(:last-child) {
				margin-bottom: 0.5rem;
			}

			> .item:not(:last-child) {
				margin-right: 0.5rem;
			}
		}
	}
</style>
