<svelte:options accessors />

<script lang="ts">
	import Connection, { type Tconection } from './Connection.svelte'

	export let id: number | string
	export let className = ''

	export let top: number
	export let left: number

	export let inputs: Tconection
	export let outputs: Tconection

	export let content: HTMLElement
	export let parent: HTMLElement
</script>

<div class="parent-node" bind:this={parent}>
	<div
		id="node-{id}"
		class="drawflow-node template selected {className}"
		style="top: {top}px; left: {left}px;">
		<Connection {...inputs} bind:json={inputs.json} type="input" />
		<div class="drawflow_content_node" bind:this={content}>
			<div>
				<slot />
			</div>
		</div>
		<Connection {...outputs} bind:json={outputs.json} type="output" />
		<div class="drawflow-delete">x</div>
	</div>
</div>
