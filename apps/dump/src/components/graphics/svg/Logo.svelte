<script>
	import { draw } from 'svelte/transition'
	import { linear } from 'svelte/easing'
	import { onMount } from 'svelte'

	export let duration = 1500

	// don't animate until it becomes a boolean, then do it an an interval... draw... esare...
	let key
	onMount(() => {
		key = !key
		const i = setInterval(() => (key = !key), 10000)
		return () => clearInterval(i)
	})
	// https://yqnn.github.io/svg-path-editor/

	import { theme } from '@cmp/theme/store'
	export let contrast = $theme == 'dark'
</script>

<svg viewBox="1 2 8 6" xmlns="http://www.w3.org/2000/svg">
	{#if key != undefined}
		{#key key}
			<path
				transition:draw={{ duration, easing: linear }}
				d="M 3 6 L 3 4 L 7 6 L 3 6 L 7 4 L 7 6 L 9 5 L 7 4 L 3 4 L 1 5 L 3 6 L 5 8 L 7 6 L 9 8 L 9 2 L 7 4 L 5 2 L 3 4 L 1 2 L 1 8 L 3 6"
				stroke={contrast ? '#000' : '#fff'}
				stroke-width=".5"
				fill="none" />
		{/key}
	{/if}
</svg>
