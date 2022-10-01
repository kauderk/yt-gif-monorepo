<script lang="ts">
	import '../../../styles/drop-down-menu.scss'

	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'
	const dispatch = createEventDispatcher()

	let _class = 'footer-ddm'

	export { _class as class }
	export let opened = true

	let el: HTMLElement
	export const hovering = () => el.matches(':hover')

	export let anyFocus: b
	export let forceOpen = false

	const tryClose = (focus?: false) => {
		// the "tick()" function should be helpful...
		const _focus = focus ?? anyFocus
		if (!forceOpen && !hovering() && !_focus) {
			dispatch('opened', false)
			opened = false
			return
		}
		dispatch('opened', null)
	}

	export const openTryClose = (hover: b, focus?: false) => {
		if (hover) {
			dispatch('opened', true)
			open(true)
			return
		}
		tryClose(focus)
	}

	const open = (hover: b) => {
		opened = hover
	}
</script>

<div
	transition:slide
	class={_class}
	class:hidden={!opened}
	class:show={opened}
	bind:this={el}
	on:mouseenter={() => open(true)}
	on:mouseleave={() => tryClose()}>
	<slot />
</div>

<style>
	.hidden {
		display: none;
	}
	.show {
		z-index: 10;
	}
</style>
