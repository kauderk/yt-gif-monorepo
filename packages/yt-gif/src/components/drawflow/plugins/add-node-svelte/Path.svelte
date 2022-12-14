<script lang="ts">
	import type { DataNode } from '.'

	export let input_row: s
	export let output_row: s

	export let dataNode: DataNode
</script>

<!-- prettier-ignore -->
<svg
	class={`
		connection 
		node_in_node-${dataNode.id} 
		node_out_node-${dataNode.inputs[input_row].connections[Number(output_row)].node} 
		${dataNode.inputs[input_row].connections[Number(output_row)].input} ${input_row}
	`}>
	<path d="" class="main-path" />
</svg>
