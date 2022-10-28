<script lang="ts">
	import Grid from 'svelte-grid/src/index.svelte'
	// @ts-ignore
	import gridHelp from 'svelte-grid/src/utils/helper'
	import Temp from './graph-node/YTGIF.svelte'

	const COLS = 6

	const id = () => '_' + Math.random().toString(36).substr(2, 9)

	const randomNumberInRange = (min: n, max: n) =>
		Math.random() * (max - min) + min

	let items = [
		{
			[COLS]: gridHelp.item({
				x: 0,
				y: 0,
				w: 3,
				h: 4,
				customDragger: true,
			}),
			id: id(),
		},

		{
			[COLS]: gridHelp.item({
				x: 3,
				y: 0,
				w: 3,
				h: 4,
				customDragger: true,
			}),
			id: id(),
		},
	]

	const cols = [[1100, 6]]

	function add() {
		let newItem = {
			6: gridHelp.item({
				x: 0,
				y: 0,
				w: 3,
				h: 4,
			}),
			id: id(),
		}

		let findOutPosition = gridHelp.findSpace(newItem, items, COLS)

		newItem = {
			...newItem,
			[COLS]: {
				...newItem[COLS],
				...findOutPosition,
			},
		}

		items = [...items, ...[newItem]]
	}

	const addAt = () => {
		let newItem = {
			6: gridHelp.item({
				w: 3,
				h: 4,
				x: 0,
				y: 0,
				customDragger: true,
			}),
			id: id(),
		}

		items = [...[newItem], ...items]

		items = gridHelp.adjust(items, COLS)
	}

	const remove = (item: GridItem) => {
		items = items.filter(value => value.id !== item.id)

		if (adjustAfterRemove) {
			items = gridHelp.adjust(items, COLS)
		}
	}

	let adjustAfterRemove = true
</script>

<div>
	<button on:click={addAt}>Add Note</button>
	<label>
		<input type="checkbox" bind:checked={adjustAfterRemove} />
		Adjust elements after removing an item
	</label>
</div>

<div class="wrapper">
	<Grid
		bind:items
		rowHeight={150}
		let:item
		let:dataItem
		gap={[10, 10]}
		{cols}
		let:movePointerDown>
		<div class="demo-widget">
			<div class="options">
				<span
					on:pointerdown={e => e.stopPropagation()}
					on:click={() => remove(dataItem)}
					class="remove">
					✕
				</span>
				{#if item.customDragger}
					<div class="dragger" on:pointerdown={movePointerDown}>
						✋
					</div>
				{/if}
			</div>
			<div class="item-wrapper">
				<slot name="item" data-hash={dataItem.id}>
					<Temp />
				</slot>
			</div>
		</div>
	</Grid>
</div>

<style lang="scss">
	.options {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		width: fit-content;
		position: absolute;
		right: 0;
		gap: 0.5em;
		margin: 0 0.5em;
		z-index: 1;
		top: 0.5em;
		.remove,
		.dragger {
			cursor: pointer;
			filter: brightness(110%);
		}
	}
	.item-wrapper,
	.demo-widget {
		display: flex;
		align-items: center;
		justify-content: center;
		height: inherit;

		background-color: #fa807214;
	}
	.wrapper {
		height: auto;
		width: auto;
		margin-bottom: 100%;

		background: var(--ddm-600);
	}

	:global(.svlt-grid-shadow) {
		/* Back shadow */
		background: var(--ddm-300);
	}
	:global(.svlt-grid-container) {
		/* Container color */
		background: var(--ddm-400);
	}
	:global(.svlt-grid-resizer::after) {
		/* Resizer color */
		border-color: var(--ddm-s-500) !important;
	}
</style>
