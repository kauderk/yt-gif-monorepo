<script lang="ts">
	export let drag: (ev: any) => void
	export let drop: (ev: any) => void
	export let positionMobile: (ev: any) => void
	export let name: string
</script>

<div
	class="drag-drawflow"
	draggable="true"
	on:dragstart={drag}
	on:touchend={drop}
	on:touchmove={positionMobile}
	on:touchstart={drag}
	data-node={name}>
	<slot />
</div>

<style lang="scss">
	div {
		&:active {
			cursor: grabbing;
		}
		cursor: grab;
	}
</style>
