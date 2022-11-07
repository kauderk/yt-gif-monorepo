<script lang="ts">
	export let input_item: string
	export let output_item: string

	export let dataNode: any = {}
</script>

<svg
	class={`
		connection 
		node_in_node-${dataNode.id} 
		node_out_node-${dataNode.inputs[input_item].connections[output_item].node} 
		${dataNode.inputs[input_item].connections[output_item].input} ${input_item}
	`}>
	<path d="" class="main-path" />
</svg>
