<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
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

<style>
	div {
		height: 100vh;
		top: 0;
		left: 0;
		width: 100vw;
		position: absolute;
		overflow: hidden;
		background-color: rgb(28, 30, 32) !important;
		background-image: linear-gradient(
				rgb(92, 92, 92) 1px,
				rgba(0, 0, 0, 0) 1px
			),
			linear-gradient(90deg, rgb(92, 92, 92) 1px, rgba(0, 0, 0, 0) 1px);
		background-size: 6.5rem 6.5rem !important;
		background-position: 0px 0px;
		box-shadow: rgba(0, 0, 0, 0.5) 15px 15px 25px 0px;
	}
</style>
