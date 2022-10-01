<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import Drop from './Drop.svelte'

	const entryIcon = <const>{
		on: 'plus-square',
		tooltip: 'Parameters',
		placement: 'bottom',
	}
	export let placement: 'left' | 'right' = 'right'
	const options = <const>{
		start: {
			tooltip: 'Insert as "start"',
			placement,
			on: 'arrow-bar-right',
			data: { 'data-btn': 'start' },
			self: true,
		},
		end: {
			tooltip: 'Insert as "end"',
			placement,
			on: 'arrow-bar-left',
			data: { 'data-btn': 'end' },
			self: true,
		},
		speed: {
			tooltip: 'Insert as "speed"',
			placement,
			on: 'clock-history',
			data: { 'data-btn': 'speed' },
			self: true,
		},
		reset: {
			tooltip: 'Reset Boundaries',
			placement,
			on: 'arrow-counterclockwise',
			data: { 'data-btn': 'reset' },
			self: true,
		},
	}
</script>

<Drop {entryIcon}>
	<div class="vertical">
		<Icon {...options.start} />
		<Icon {...options.end} />
		<Icon {...options.speed} />
		<Icon {...options.reset} />
	</div>
</Drop>

<!-- <style>
	.vertical {
		padding: 2px;
		background: rgba(38, 218, 32, 0.178);
		position: relative;
	}
</style> -->
