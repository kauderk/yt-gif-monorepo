<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	const setOpen = (b: b) => {
		dispatch('open', b)
	}
	const setFocus = (b: b) => {
		dispatch('focus', b)
	}
	export let tag: s = 'span'
</script>

<svelte:element
	this={tag}
	tabindex="-1"
	on:mouseenter={() => setOpen(true)}
	on:mouseleave={() => setOpen(false)}
	on:focus={() => setFocus(true)}
	on:blur={() => setFocus(false)}>
	<slot />
</svelte:element>
