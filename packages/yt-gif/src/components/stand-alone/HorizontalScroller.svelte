<script lang="ts">
	import type { Scroller } from '$cmp/drawflow/cmp/ctx'
	import { ObjectEntries } from '$lib/utils'
	import { createEventDispatcher, tick } from 'svelte'

	// https://github.com/nicolasmgaray/svelte-horizontal-scroller/blob/master/src/Component.svelte
	// https://github.com/mpsb/horizontal-on-vertical-scroll-exp/blob/main/src/routes/index.svelte
	// https://github.com/Muhammad-Rubel/Plexar-Horizontal-Scroll-Page/blob/main/src/routes/index.svelte
	// http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
	// ----------- THUMB ------------
	let scroller: HTMLElement
	let pos = { left: 0, x: 0 }

	function mouseDownHandler(e: MouseEvent) {
		// Set initial scroll and mouse position
		pos = {
			left: scroller.scrollLeft,
			x: e.clientX,
		}
		// Remove CSS styles
		scroller.style.scrollBehavior = 'auto'
		scroller.style.cursor = 'grabbing'
		scroller.style.userSelect = 'none'
		scroller.style.scrollSnapType = 'none'
		// Add handlers
		document.addEventListener('mousemove', mouseMoveHandler)
		document.addEventListener('mouseup', mouseUpHandler)
	}

	function mouseUpHandler() {
		// Remove listeners
		document.removeEventListener('mousemove', mouseMoveHandler)
		document.removeEventListener('mouseup', mouseUpHandler)
		// Restore css
		scroller.style.scrollSnapType = 'x mandatory'
		scroller.style.cursor = 'grab'
		scroller.style.removeProperty('user-select')
		scroller.style.scrollBehavior = 'smooth'
	}

	function mouseMoveHandler(e: MouseEvent) {
		// Update scroll based on mouse movement
		const dx = e.clientX - pos.x
		scroller.scrollLeft = pos.left - dx
	}

	// ----------- WHEEL ------------
	let deltaY = 0

	const dispatch = createEventDispatcher()

	function scroll(event: WheelEvent) {
		if (event.deltaY >= -1) {
			deltaY -= event.deltaY
			scroller.scroll({ left: -deltaY, behavior: 'smooth' })
		} else {
			deltaY += event.deltaY
			scroller.scroll({ left: deltaY, behavior: 'smooth' })
		}
	}

	export let scrollValues: Scroller
	const _scrollValues = Object.freeze({ ...scrollValues })
	$: {
		scrollValues = {
			scrollLeft: scroller?.scrollLeft || _scrollValues.scrollLeft,
			scrollTop: scroller?.scrollTop || _scrollValues.scrollTop,
			deltaY: deltaY || _scrollValues.deltaY,
		}
	}

	let enabled = false
	const start = (el: HTMLElement) => {
		el.scrollLeft = scrollValues.scrollLeft
		deltaY = scrollValues.deltaY
		enabled = true
	}
</script>

<div
	use:start
	class:enabled
	class="HorizontalScroller"
	on:mousedown={mouseDownHandler}
	bind:this={scroller}
	on:wheel|preventDefault|stopPropagation={scroll}>
	<slot />
</div>

<style lang="scss">
	// ----------- THUMB ------------
	.HorizontalScroller {
		width: var(--horizontal-scroller-width, auto);
		cursor: grab;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
		&.enabled {
			scroll-behavior: smooth;
		}

		padding: var(--horizontal-scroller-padding);
		display: flex;
		gap: var(--horizontal-scroller-gap, 0.5em);
		&::-webkit-scrollbar {
			display: none;
		}
		& > :global(*) {
			flex-grow: 0;
			flex-shrink: 0;
		}
		// ----------- WHEEL ------------
		&.enabled {
			transition: 0.2s ease;
			overflow-x: hidden;
			white-space: nowrap;
		}
	}
</style>
