<script lang="ts">
	export let drag: (ev: any) => void
	export let name = 'missing'
</script>

<div
	class="drag-drawflow flex justify-start items-center space-x-6 rounded px-3 py-2  w-full md:w-52"
	draggable="true"
	on:dragstart={drag}
	data-node={name}>
	<i class={'fab fa-' + name} /><span class="text-base leading-4"
		>{name}</span>
</div>

<style>
	.drag-drawflow {
		border-radius: var(--radius-2);
		border-color: var(--surface2);
		border-width: var(--border-size-2);
	}
</style>
