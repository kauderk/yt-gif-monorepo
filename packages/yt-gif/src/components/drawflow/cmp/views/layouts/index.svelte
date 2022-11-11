<script>
	import { state } from '../../basic/store'
	import Modal from './Modal.svelte'
</script>

<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>sdfsdfsdfsdf</Modal>
