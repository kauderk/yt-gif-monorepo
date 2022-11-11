<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { state } from '../../basic/store'
	import Layouts from './Layouts.svelte'
	import Modal, { getModal, type TMod } from './Modal.svelte'
	let name = 'world'

	let selection: TMod

	onMount(() =>
		state.subscribe(s => {
			if (!browser) return
			try {
				if (s.active == 'Layouts') {
					getModal().openDefault()
				} else {
					getModal().close()
				}
			} catch (error) {}
		})
	)
</script>

{#if browser}
	<Modal>
		<Layouts />
	</Modal>
{/if}
