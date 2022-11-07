<!-- 
	Meke this component look nicer, using cascade style sheets
	https://www.w3schools.com/css/
 -->
<script>
	import { getContext } from './store'
	const ctx = getContext()
</script>

<div>
	<div id="minimap" bind:this={$ctx.minimap} />
</div>

<style lang="scss" global>
	#minimap {
		border: 1px rgba(0, 183, 255, 0.63) dotted;
		width: 150px;
		height: 150px;
		position: absolute;
		bottom: 0;
		right: 0;
		cursor: move;
		overflow: hidden;
		* {
			cursor: move;
			pointer-events: none;
		}
		.mask {
			border: 1px rgba(0, 183, 255, 0.63) dotted;
			border-radius: 4px;
			position: absolute;
			background: rgba(0, 183, 255, 0.63);
			opacity: 0.3;
			pointer-events: none;
		}
	}
</style>
