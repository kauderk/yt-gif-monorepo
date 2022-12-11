<!-- {/key} -->
<script lang="ts">
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import { flip } from 'svelte/animate'
	import { type TItem, getContext, defCrossfade } from './store'
	import Item from './Item.svelte'
	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import type { TItemCtx, Scroller } from '../ctx'
	import { get, type Writable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	export let opened: TItem
	export let [send, receive] = defCrossfade

	export let LevelsOfItems: TItemCtx[][]
	export let scrollValues: Writable<Scroller[]>
</script>

<!-- {#key opened.id} -->
{#each [opened] as _ (opened.id)}
	<div class="layout-2">
		{#each LevelsOfItems as items, i}
			<HorizontalScroller
				scrollValues={get(scrollValues)[i]}
				on:update={e => ($scrollValues[i] = e.detail)}>
				{#each items as item (item.id)}
					{#if opened.id !== item.id}
						<div
							class="item"
							class:selected={opened.id == item.id}
							in:receive={{ key: item.id }}
							out:send={{ key: item.id }}>
							<Item
								hue={item.id * 35}
								title={item.title}
								icon={item.icon}
								cmp={item.cmp}
								on:click={() => dispatch('click', { item })} />
						</div>
					{:else if opened.id === item.id}
						<div class="item" transition:fade>
							<Item
								hue={item.id * 35}
								icon={item.icon}
								title={item.title}
								expanded={true} />
						</div>
					{/if}
				{/each}
			</HorizontalScroller>
		{/each}

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
					GraphNodeID={opened.GraphNodeID}>
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

		.s-menu {
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
