<script lang="ts">
	import Sub from '$v3/components/Sub/Footer.svelte'
	import BigLabel from '$v3/components/BigLabel.svelte'

	const tutOptions = <const>{
		bKMop3MUIRU: {
			name: 'Workflow showcase',
			'data-tooltip': 'A Session using the YT GIF Extension',
		},
		'sCC-QXRdcOc': {
			name: 'InAndOutKeys',
			'data-tooltip': 'What are InAndOutKeys?',
		},
	}
</script>

<Sub {tutOptions}>
	<BigLabel
		>💡 Hover over the YT GIFs to enable them.<br />Unmute them and Start
		Playing.</BigLabel>
	<BigLabel
		>🗲 While hovering out HOLD DOWN any<br />"InAndOutKeys"to keep on
		playing YT GIFs</BigLabel>
</Sub>
