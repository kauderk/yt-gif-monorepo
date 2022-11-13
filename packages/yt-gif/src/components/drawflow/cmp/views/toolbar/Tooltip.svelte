<script lang="ts">
	import { tooltip } from 'svooltip'
	import 'svooltip/svooltip.css' // Include default styling

	export let info: s[]
	export let delay = 1000

	$: currentInfo = info[0]
	let format = 'string'
</script>

<button
	use:tooltip={{
		content: currentInfo,
		format,
		onMount() {
			setTimeout(() => {
				format = 'html'
				currentInfo = `
						<h1>${info[0]}</h1>
						<p>${info[1] || ''}</p>
						<small>${info[2] || ''}</small>
					`
			}, delay)
		},
		onDestroy() {
			currentInfo = info[0]
		},
	}}>
	<slot />
</button>

<style>
	:global(.svooltip) {
		z-index: 5;
	}
</style>
