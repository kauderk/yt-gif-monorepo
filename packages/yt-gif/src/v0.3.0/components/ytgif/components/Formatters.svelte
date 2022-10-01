<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import Drop from './Drop.svelte'
	import options from './Formatters'

	const entryIcon = <const>{
		tooltip: 'Formatters',
		placement: 'bottom',
		on: 'arrow-down-up',
		off: 'arrow-left-right',
	}
</script>

<Drop {entryIcon}>
	<div class="vertical">
		<Drop entryIcon={options.startEnd}>
			<Icon {...options.start} />
			<Icon {...options.end} />
		</Drop>
		<Icon {...options.restoreUrl} />
	</div>
</Drop>

<style lang="scss">
	.vertical :global(.content) {
		display: flex;
		transform: translateY(100%);
		left: 100%;
	}
</style>
