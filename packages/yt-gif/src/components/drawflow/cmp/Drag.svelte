<script lang="ts">
	export let drag: (ev: any) => void
	export let name = 'missing'
</script>

<div
	class="drag-drawflow flex justify-start items-center space-x-6 rounded px-3  w-full md:w-52"
	draggable="true"
	on:dragstart={drag}
	data-node={name}>
	<i class={'fab fa-' + name} /><span class="text-base leading-0"
		>{name}</span>
</div>

<style>
	.drag-drawflow {
		margin-top: 10px;
		margin-bottom: 10px;
		padding-top: 4px;
		padding-bottom: 4px;
		border-radius: 0px !important;
		border-width: var(--border-size-2);
		border-color: rgb(0, 208, 250);
		box-shadow: rgb(0, 208, 250) 0px 0px 5px inset;
	}

	.drag-drawflow:hover {
		box-shadow: rgb(0, 208, 250) 0px 0px 30px inset;
	}

	.drag-drawflow span {
		margin-left: 0px !important;
	}
</style>
