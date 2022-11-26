<!-- 
	styles like https://ayushk7.github.io/CodeWire/
 -->
<script lang="ts">
	import { getContext, getProps } from './store'

	const ctx = getContext()
	const props = getProps()
</script>

<div
	style:height={$props.canvas.height}
	bind:this={$ctx.drawflowRoot}
	id="drawflow"
	class="parent-drawflow"
	on:drop={$ctx.dnd.drop}
	on:dblclick={$ctx.mul.clear_selection}
	on:dragover={$ctx.dnd.allowDrop}>
	<slot />
</div>

<style lang="scss" global>
	#drawflow {
		height: 100vh;
		overflow: hidden;
		position: relative;
		width: 100%;

		top: 0;
		left: 0;

		background-color: rgb(28, 30, 32) !important;
		// background-size: 6.5rem 6.5rem !important;

		background-position: 0px 0px;
		background-image: linear-gradient(
				rgb(72, 78, 80) 0.1rem,
				rgba(6, 6, 6, 0) 0.1rem
			),
			linear-gradient(
				90deg,
				rgb(72, 78, 80) 0.1rem,
				rgba(6, 6, 6, 0) 0.1rem
			) !important;

		box-shadow: rgba(0, 0, 0, 0.5) 15px 15px 25px 0px;
	}
	// hability to drag around
	.drawflow {
		width: 100%;
		height: 100%;
		user-select: none;
		border: 1px rgba(0, 183, 255, 0.63) dotted;
		// paths
		svg {
			z-index: 0;
			position: absolute;
			overflow: visible !important;
		}
		// lines - runtime
		.connection .main-path {
			cursor: pointer;
			fill: none;
			stroke-width: 5px;
			stroke: #838383bb;
			&:hover {
				stroke: #46b0b4;
			}

			&.selected {
				stroke: #46b44c;
			}
			&.point {
				stroke: #4d46b4;
				stroke-width: 2px;
				fill: rgba(156, 152, 152, 1);
			}
		}
	}
</style>
