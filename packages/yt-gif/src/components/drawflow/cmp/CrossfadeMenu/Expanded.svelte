<!-- {/key} -->
<script lang="ts">
	import ScrollableItems from '../sidebar/ScrollableItems.svelte'
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import { flip } from 'svelte/animate'
	import { type TItem, getContext, defCrossfade } from './store'
	import Item from './Item.svelte'

	const items = getContext()
	export let opened: TItem
	export let [send, receive] = defCrossfade
</script>

<!-- {#key opened.id} -->
{#each [opened] as _ (opened.id)}
	<div class="layout-2">
		<HorizontalScroller>
			<div class="menu">
				{#each items.filter( ({ id }) => (opened ? opened.id !== id : true) ) as item (item.id)}
					<div
						class="item"
						class:selected={opened.id == item.id}
						in:receive={{ key: item.id }}
						out:send={{ key: item.id }}
						animate:flip>
						<Item
							hue={item.id * 35}
							icon={item.icon}
							cmp={item.cmp}
							on:click={() => (opened = item)} />
					</div>
				{/each}
			</div>
		</HorizontalScroller>

		<div class="content">
			<div
				class="item"
				in:receive={{ key: opened.id }}
				out:send={{ key: opened.id }}>
				<Item
					hue={opened.id * 35}
					icon={opened.icon}
					expanded
					cmp={opened.cmp}
					GraphNodeID={opened.GraphNodeID}
					on:click>
					{opened.title}
				</Item>
			</div>
		</div>
	</div>
{/each}

<style lang="scss">
	.layout-2 {
		position: absolute;
		width: 100%;
		// horizontal scrollable component won't work with flex
		// display: flex;
		justify-content: start;
		// padding: 0.5rem;

		// horizontal
		flex-direction: column;
		align-items: center;
		align-content: center;

		.menu {
			display: flex;
			gap: 0.5em;
			> .item:not(:last-child) {
				margin-bottom: 0.5rem;
			}
		}

		> .content {
			flex-grow: 1;
			margin: auto;
			// nice offset when vertical
			// padding-left: 0.5rem;

			// fit horizontally
			width: inherit;

			> .item {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
