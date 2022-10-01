<script lang="ts">
	import type { TAction } from '$v3/stores/ddm-actions'

	export let zIndex: n
	export let overlay: b
	export let action: TAction
	export let preventDefault: b
	export let stopPropagation: b
	export let hidden = false

	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	const eventClick = (e: Event) => {
		if (preventDefault) e.preventDefault()
		if (stopPropagation) e.stopPropagation()

		dispatch('setOpen', {})
	}

	$: onClick = action === 'click' ? eventClick : null
	$: onTouchEnd = action === 'click' ? eventClick : null

	$: onMouseEnter = action === 'hover' ? eventClick : null
</script>

{#if overlay}
	<div
		id="overlay"
		class="overlay"
		class:hidden
		transition:fade={{ duration: 100 }}
		on:mouseenter={onMouseEnter}
		on:click={onClick}
		on:touchend={onTouchEnd}
		style="z-index: {zIndex}; background-color: var(--hsla-overlay)" />
{/if}

<style lang="scss">
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		cursor: pointer;
	}
</style>
