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
	<div class="vignette" style="position: absolute" draggable="false" />
</div>

<style lang="scss" global>
	#drawflow {
		height: 100vh;
		overflow: hidden;
		position: relative;
		width: 100%;

		top: 0;
		left: 0;
	}
	// style
	#drawflow {
		--bg: #180032;
		--o: #121313 1.5px;
		--i: rgb(31, 31, 31) 1px;

		background-color: var(--bg) !important;
		background:
			//
			linear-gradient(90deg, var(--i), transparent 0),
			linear-gradient(180deg, var(--i), transparent 0),
			//
			linear-gradient(90deg, var(--o), transparent 0),
			linear-gradient(180deg, var(--o), transparent 0);

		background-size:
			//
			25px 25px, 25px 25px,
			//
			125px 125px,
			125px 125px;
	}
	#drawflow .vignette {
		display: block;
		position: absolute;
		pointer-events: none;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		background-image: radial-gradient(
			ellipse,
			transparent 50%,
			rgba(33, 34, 38, 1)
		);
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
