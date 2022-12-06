<script>
	export let selectedIndex = 0
	import {
		slashVisible,
		slashItems,
		slashLocaltion,
		slashProps,
	} from '../stores'

	let height

	let elements = []
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

{#if $slashVisible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="w-full absolute h-screen top-0 wrapper w-96"
		on:click={() => ($slashVisible = false)} />
	<div
		class="absolute shadow-xl w-96 h-auto max-w-full rounded-lg outter s-scrollbar"
		style="left: 0px; top: {$slashLocaltion.y + $slashLocaltion.height + 0 >
		height
			? $slashLocaltion.y - $slashLocaltion.height - 0
			: $slashLocaltion.y + $slashLocaltion.height}px;">
		<div class="p-2 text-sm text-slate-500 slate">BLOCKS</div>
		{#each $slashItems as { title, subtitle, command }, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="p-1 cursor-pointer {i == selectedIndex
					? 'bg-slate-100'
					: 'bg-white'} title"
				on:mouseenter={() => (selectedIndex = i)}
				on:click={() => {
					$slashVisible = false
					command($slashProps)
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

<style lang="scss">
	.outter {
		color: white;
		overflow: auto;
	}
	.slate {
		background: blue;
		color: inherit;
	}
	.title {
		background: darkblue;
		color: inherit;
	}
	.subtitle {
		background: darkblue;
		color: inherit;
	}
</style>
