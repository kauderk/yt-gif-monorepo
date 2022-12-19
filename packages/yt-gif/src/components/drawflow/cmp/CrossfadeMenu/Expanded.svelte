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

<!-- Note: a wrapper should have position:absolute if the sender/receiver is right next to it -->
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
							{...item}
							type={['label', 'draggable']}
							on:click={() => dispatch('click', { item })} />
					</div>
				{:else if opened.id === item.id}
					<div class="item" transition:fade>
						<Item
							hue={item.id * 35}
							{...opened}
							type={['label', 'draggable', 'expanded']} />
					</div>
				{/if}
			{/each}
		</HorizontalScroller>
	{/each}
</aside>
<!-- Note: both this element will work just fine, since this container is position:absolute -->
<div class="crossfade-container">
	<main class="relative">
		{#key opened}
			<div
				class="crossfade"
				in:receive={{ key: opened.id }}
				out:send={{ key: opened.id }}>
				<Item
					hue={opened.id * 35}
					{...opened}
					type={['component', 'draggable', 'expanded']}>
					{opened.title}
				</Item>
			</div>
		{/key}
	</main>
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
</style>
