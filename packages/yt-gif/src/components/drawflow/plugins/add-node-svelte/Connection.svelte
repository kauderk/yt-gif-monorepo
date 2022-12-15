<script lang="ts">
	import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'

	export let type: 'input' | 'output'
	export let rows: n
	export let json: DrawflowNode['inputs'] | DrawflowNode['outputs']

	const range = (N: number) => [...Array(N).keys()]
	const conection = (sfx: string, N: number) => {
		const idx = sfx + '_' + (N + 0) // FUCK!
		json![idx] = { connections: [] }
		return idx
	}
</script>

{#each range(rows) as i}
	<div class="{type}s">
		<div class="{type} {conection(type, i)}" />
	</div>
{/each}

<style lang="scss" global>
	.drawflow {
		.input,
		.output {
			position: relative;

			width: 20px;
			height: 20px;
			border-radius: 50%;
			margin-bottom: 5px;

			cursor: crosshair;
			z-index: 1;

			background: rgb(119, 119, 119);
		}
		// Axis aligment
		.input {
			left: -23.5px;
			top: 2px;
		}
		.output {
			right: -3px;
			top: 2px;
		}

		// don't take space
		.inputs,
		.outputs {
			width: 0;
		}

		// rare conflict with @apps/dump
		.input {
			padding-right: 0 !important;
		}
	}
</style>
