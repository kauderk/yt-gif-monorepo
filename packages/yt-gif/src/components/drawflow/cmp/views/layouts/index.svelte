<script>
	import { state } from '../../basic/store'
	import Layouts from './Layouts.svelte'
	import Modal from './Modal.svelte'
	import Add from './views/Add.svelte'
	import Chips from './views/Chips.svelte'
	import Settings from './views/Settings.svelte'
</script>

<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>
	<div>
		<Layouts />
	</div>
</Modal>

<style>
	div {
		width: auto;
		aspect-ratio: 1 / 1;
		position: inherit;
	}
</style>
