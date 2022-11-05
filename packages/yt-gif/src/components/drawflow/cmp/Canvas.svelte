<script>
	import { getContext } from './store'

	const ctx = getContext()
</script>

<div
	bind:this={$ctx.drawflowRoot}
	id="drawflow"
	on:drop={$ctx.dnd.drop}
	on:dblclick={$ctx.mul.clear_selection}
	on:dragover={$ctx.dnd.allowDrop}>
	<slot />
</div>
