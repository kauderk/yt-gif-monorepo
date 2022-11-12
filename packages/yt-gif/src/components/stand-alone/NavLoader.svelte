<script lang="ts" context="module">
	import { writable } from 'svelte/store'
	type NavigationState = 'loading' | 'loaded' | null
	export let navState = writable<NavigationState>(null)
</script>

<script>
	// https://svelte.dev/repl/e6a86cc325d44b72a9b2afd18149fb91?version=3.44.1
	// https://dev.to/shajidhasan/add-a-youtube-like-page-loading-animation-in-sveltekit-58kp
	import { onDestroy } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	const progress = tweened(0, { easing: cubicOut })
	const opacity = tweened(1, { easing: cubicOut })

	const unsubscribe = navState.subscribe(state => {
		console.log(state)
		if (state === 'loading') {
			opacity.set(1, { duration: 0 })
			progress.set(0.7, { duration: 3500 })
		} else if (state === 'loaded') {
			const duration = 1000

			progress.set(1, { duration })
			opacity.set(0, { duration: duration / 2, delay: duration / 2 })

			setTimeout(() => {
				progress.set(0, { duration: 0 })
			}, duration)
		}
	})

	onDestroy(unsubscribe)
</script>

<div class="progress-bar" style={`opacity: ${$opacity}`}>
	<div class="progress-sliver" style={`--width: ${$progress * 100}%`} />
</div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0.4rem;
		z-index: 999;
		pointer-events: none; /* this is important since we aren't dismounting */
	}
	.progress-sliver {
		width: var(--width);
		background-color: #f8485e;
		height: 100%;
	}
</style>
