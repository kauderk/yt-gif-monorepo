<script lang="ts">
	import { fly } from 'svelte/transition'
	import MenuItem from './MenuItem.svelte'
	import { mdiArrowLeft } from '@mdi/js'

	export let type = 'sub-ddm'
	export let condition: b
	export let offsetHeight: n
	export let offsetWidth: n
	export let go: Function
</script>

{#if condition}
	<div
		class="drop {type}-ddm"
		bind:offsetHeight
		bind:offsetWidth
		in:fly={{ x: 300 }}
		out:fly={{ x: 300 }}>
		<div class="self-center">
			<MenuItem on:click={() => go()} leftIcon={mdiArrowLeft}
				>Back</MenuItem>
		</div>
		<slot />
	</div>
{/if}

<style>
	.drop {
		position: relative;
		padding: var(--ddm-menu-padding);
	}
</style>
