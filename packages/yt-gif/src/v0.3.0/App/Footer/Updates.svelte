<script lang="ts">
	import Sub from '$v3/components/Sub/Footer.svelte'
	import BigLabel from '$v3/components/BigLabel.svelte'

	import type { TIcon } from '../Icons'

	export let iconOptions: TIcon
	const tutOptions = {
		'MbZUoXN-PZQ': {
			name: 'Narrated Showcase',
			'data-tooltip': 'YT GIF Extesion v2 Narrated Showcase',
		},
		O6zULK3w5Go: {
			name: 'v2 Features',
			'data-tooltip': 'YT GIF Extesion v2 Features Speed Run',
		},
	}
</script>

<Sub {tutOptions} {iconOptions}>
	<BigLabel>YT GIF Extension v2</BigLabel>
</Sub>
