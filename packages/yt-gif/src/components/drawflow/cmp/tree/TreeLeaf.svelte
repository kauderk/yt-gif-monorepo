<script>
	import { createEventDispatcher } from 'svelte'

	export let title
	export let visible = true
	export let iconClass = 'bi bi-file-earmark'

	//Functions for interacting with the nodes
	const dispatch = createEventDispatcher()
	export let treeLeafDoubleClick = function () {
		dispatch('treeLeafDoubleClick')
	}
</script>

{#if visible}
	<span on:dblclick={treeLeafDoubleClick}>
		<i class={iconClass} />
		<span class="p-2">{title}</span>
	</span>
{/if}

<style>
</style>
