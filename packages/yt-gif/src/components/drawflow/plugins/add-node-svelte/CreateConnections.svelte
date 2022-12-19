<script lang="ts">
	import type { DataNode } from '.'

	import Path from './Path.svelte'

	export let dataNode: DataNode

	const mapInputToCb = (_: HTMLElement, input_row: string) => {
		Object.keys(dataNode.inputs[input_row].connections).forEach(
			output_row => {
				new Path({
					target: dataNode.precanvas,
					props: {
						input_row,
						output_row,
						dataNode,
					},
				})
			}
		)
	}
</script>

<div class="inputs">
	{#each Object.keys(dataNode.inputs) as input_row}
		<div class="input {input_row}" use:mapInputToCb={input_row} />
	{/each}
</div>
