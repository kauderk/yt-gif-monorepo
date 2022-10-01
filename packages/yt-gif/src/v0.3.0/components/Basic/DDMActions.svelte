<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import { ddmAction } from '$v3/stores/ddm-actions'

	const icon = <const>{
		on: 'mouse3-fill',
		off: 'hand-index',
		tooltip: 'Menu: Hover or Clicks',
		type: 'check',
		click() {
			ddmAction.update(a => (a == 'click' ? 'hover' : 'click'))
		},
		placement: 'bottom',
	}
</script>

<div>
	<Icon {...icon} />
</div>

<style>
	div {
		position: absolute;
		padding: 10px;
		z-index: 1;
	}
</style>
