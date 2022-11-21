<script lang="ts">
	import Grid from 'svelte-grid/src/index.svelte'
	// @ts-ignore
	import gridHelp from 'svelte-grid/src/utils/helper'
	import YTGIF from '$cmp/graph-node/YTGIF.svelte'

	const COLS = 16

	const id = () => '_' + Math.random().toString(36).substring(2, 9)

	let items = [
		{
			[COLS]: gridHelp.item({
				x: 0,
				y: 0,
				w: 8,
				h: 5,
				customDragger: true,
			}),
			id: id(),
		},

		// {
		// 	[COLS]: gridHelp.item({
		// 		x: 3,
		// 		y: 0,
		// 		w: 3,
		// 		h: 4,
		// 		customDragger: true,
		// 	}),
		// 	id: id(),
		// },
	]

	const cols = [[1000, COLS]]

	const addAt = () => {
		let newItem = {
			[COLS]: gridHelp.item({
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

	import { style, swap, tempTarget } from '$stores/fly'
	import { send, receive } from '$lib/transitions/crossfade'

	import Player from '$v3/components/ytgif/Player.svelte'

	let iN = 'theater'
	let status: s
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
		rowHeight={50}
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
					<YTGIF />
				</slot>
			</div>
		</div>
	</Grid>
</div>
<span class="mt-5" />
<button
	on:click={() => {
		$swap.swap = !$swap.swap
	}}>swap</button>

<main>
	status: {status}
	<div class="list">
		{#if $swap.swap}
			<button
				in:receive={{ key: iN }}
				out:send={{ key: iN }}
				bind:this={$tempTarget}
				on:introstart={() => (status = 'intro started')}
				on:outrostart={() => (status = 'M: outro started')}
				on:introend={() => (status = 'M: intro ended')}
				on:outroend={() => (status = 'outro ended')}>
				btn 1
			</button>
		{/if}
	</div>

	<!-- <div class="list">
		{#if !$swap}
			<button in:receive={{ key: iN }} out:send={{ key: iN }}>
				btn 2
			</button>
		{/if}
	</div> -->
</main>

<div id="player" style={$style}>
	<div class="content">
		<Player />
	</div>
</div>

<svelte:window />

<style lang="scss">
	// :global(:is(.svlt-grid-item, .svlt-grid-resizer)) {
	// 	width: auto !important;
	// 	aspect-ratio: 16 / 9 !important;
	// }
	span.mt-5 {
		display: block;
		aspect-ratio: 1;
		height: 50px;
	}
	.list button {
		background-color: cornflowerblue;
		border: none;
		color: white;
		padding: 10px;
		margin-bottom: 10px;
		width: 100%;
	}
	.list {
		display: inline-block;
		margin-right: 30px;
		vertical-align: top;
		width: 70px;
	}

	.content {
		margin: 0.3em;
		background-color: rgba(0, 234, 255, 0.267);
		// centered
		height: -webkit-fill-available;
		display: flex;
		justify-content: center;
		//aspect-ratio: 16 / 9;

		:global(div:first-child) {
			scroll-snap-type: x mandatory;
			scroll-snap-align: center;
		}
		> :global(div:first-child) {
			width: auto !important;
			//height: inherit;
		}
	}

	#player {
		width: 200px;
		aspect-ratio: 16 / 9;
		background-color: rgb(40, 41, 40);
		position: absolute;
		left: 0px;
		top: 0px;
		transition: all 0.5s;
	}

	.options {
		display: flex;
		flex: 0 0 0%;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		width: fit-content;
		position: absolute;
		right: -40px;
		margin: 0 0.5em;
		z-index: 1;
		top: 0.5em;
		gap: 0.5em;
		.remove,
		.dragger {
			cursor: pointer;
			filter: brightness(110%);
		}
	}
	.demo-widget {
		height: inherit;
		background-color: rgba(0, 13, 255, 0.1019607843);
	}
	.item-wrapper {
		background-color: rgb(25 255 0 / 8%);
		height: inherit;
		width: inherit;
	}
	.wrapper {
		height: auto;
		width: auto;
		//margin-bottom: 100%;

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
		right: -2px !important;
		bottom: -2px !important;
	}
</style>
