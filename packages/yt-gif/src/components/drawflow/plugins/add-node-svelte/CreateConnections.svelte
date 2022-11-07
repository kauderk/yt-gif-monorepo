<script lang="ts">
	import Path from './Path.svelte'

	export let dataNode: any

	const mapInputToCb = (_: HTMLElement, input_item: string) => {
		Object.keys(dataNode.inputs[input_item].connections).forEach(
			output_item => {
				new Path({
					target: dataNode.precanvas,
					props: {
						input_item,
						output_item,
						dataNode,
					},
				})
				// I think this is not necesary... since it happens once the parent dicatates "onDestroy" ritht?
				// flush.push(() => path.$destroy)
			}
		)
	}
</script>

<div class="inputs">
	{#each Object.keys(dataNode.inputs) as input_item}
		<div class="input {input_item}" use:mapInputToCb={input_item} />
	{/each}
</div>
