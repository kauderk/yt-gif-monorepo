<script>
	import Modal from '$cmp/drawflow/cmp/views/layouts/Modal.svelte'
	import Settings from '$cmp/drawflow/cmp/views/layouts/views/Settings.svelte'
	import { state } from '$cmp/drawflow/cmp/basic/store'
	import { onMount } from 'svelte'

	// save
	onMount(() => state.useLocalStorage())
</script>

<button on:click={() => ($state.active = 'Layouts')}>open Settings</button>
<Modal
	isOpen={$state.active == 'Layouts'}
	on:close={() => ($state.active = 'fullGraph')}>
	<div>
		<Settings />
	</div>
</Modal>

<style>
	div {
		width: auto;
		aspect-ratio: 1 / 1;
		position: inherit;
	}
</style>
