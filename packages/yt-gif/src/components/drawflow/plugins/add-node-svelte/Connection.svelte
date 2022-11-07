<script lang="ts" context="module">
	export type Tconection = {
		length: number
		offset?: number
		type: 'input' | 'output'
		json: { [key: string]: { [key: string]: any[] } }
	}
</script>

<script lang="ts">
	export let offset = 0
	export let length = 0
	export let type: Tconection['type']

	export let json: Tconection['json'] = {}

	const range = (N: number) => [...Array(N).keys()]
	const conection = (sfx: string, N: number) => {
		const idx = sfx + '_' + (N + offset) // FUCK!
		json![idx] = { connections: [] }
		return idx
	}
</script>

{#each range(length) as i}
	<div class="{type}s">
		<div class="{type} {conection(type, i)}" />
	</div>
{/each}

<style lang="scss" global>
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
</style>
