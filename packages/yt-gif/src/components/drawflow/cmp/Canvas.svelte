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
		background-color: #26282b;
		background-image: linear-gradient(
				rgb(92, 92, 92) 0.1rem,
				transparent 0.1rem
			),
			linear-gradient(90deg, rgb(92, 92, 92) 0.1rem, transparent 0.1rem);
		background-size: 10rem 10rem;
		background-position: 0px 0px;
	}
</style>
