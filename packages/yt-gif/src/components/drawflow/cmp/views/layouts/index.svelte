<script>
	import { state } from '../../basic/store'
	import Modal from './Modal.svelte'
	import Add from './views/Add.svelte'
	import Chips from './views/Chips.svelte'
	import Settings from './views/Settings.svelte'
</script>

<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}><Chips /></Modal>
