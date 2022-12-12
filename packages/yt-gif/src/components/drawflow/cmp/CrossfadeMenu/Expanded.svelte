<!-- {/key} -->
<script lang="ts">
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import { flip } from 'svelte/animate'
	import { type TItem, getContext, defCrossfade } from './store'
	import Item from './Item.svelte'
	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import type { TItemCtx, Scroller } from '../ctx'
	import type { Writable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	export let opened: TItem
	export let [send, receive] = defCrossfade

	export let LevelsOfItems: TItemCtx[][]
	export let scrollValues: Writable<Scroller[]>
</script>

<!-- {#key opened.id} -->

<div class="layout-2">
	<aside class="scrollers">
		{#each LevelsOfItems as items, i}
			<HorizontalScroller bind:scrollValues={$scrollValues[i]}>
				{#each items as item}
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
	</aside>

	<div class="crossfade-container">
		<main class="relative">
			{#key opened}
				<div
					class="crossfade"
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
			{/key}
		</main>
	</div>
</div>

<style lang="scss">
	.scrollers {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em;
	}
	.crossfade-container {
		position: absolute;
		width: auto;
		padding: 0.5em;
		> main.relative {
			> .crossfade {
				position: absolute;
				height: auto;
			}
		}
	}
	.layout-2 {
		width: 100%;
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
