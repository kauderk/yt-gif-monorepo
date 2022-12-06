<script lang="ts">
	import { Subscribe } from 'svelte-subscribe'
	export let selectedIndex = 0

	let height: n

	import type { createStore } from '../stores'
	export let store: ReturnType<typeof createStore>

	let elements: HTMLElement[] = []
	$: {
		if (elements[0] != null) {
			elements[selectedIndex]?.scrollIntoView({
				block: 'end',
				behavior: 'smooth',
			})
		}
	}
</script>

<svelte:window bind:innerHeight={height} />

<Subscribe
	{...store}
	let:slashVisible
	let:slashLocaltion
	let:slashItems
	let:slashProps>
	{#if slashVisible}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="w-full fixed h-screen top-0 wrapper w-96"
			on:click={() => store.slashVisible.set(false)} />
		<div
			class="absolute shadow-xl w-96 h-auto max-w-full rounded-lg outter s-scrollbar">
			<div class="p-2 text-sm text-slate-500 slate">BLOCKS</div>
			{#each slashItems as { title, subtitle, command }, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="p-1 cursor-pointer {i == selectedIndex
						? 'bg-slate-100'
						: 'bg-white'} title"
					on:mouseenter={() => (selectedIndex = i)}
					on:click={() => {
						store.slashVisible.set(false)
						command(slashProps)
					}}
					bind:this={elements[i]}>
					<div class="">{title}</div>
					<div class="text-sm text-slate-500 subtitle">
						{subtitle ? subtitle : ''}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Subscribe>

<style lang="scss">
	.outter {
		color: white;
		overflow: auto;
	}
	.slate {
		background: black;
		color: inherit;
	}
	.title {
		background: #2a2a2a;
		color: inherit;
	}
	.subtitle {
		opacity: 0.5;
		background: #242424;
		color: inherit;
	}
</style>
