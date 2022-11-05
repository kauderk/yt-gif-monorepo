<script lang="ts" context="module">
	export type Tconection = {
		length: number
		json: { [key: string]: { [key: string]: any[] } }
	}
</script>

<script lang="ts">
	export let length = 0
	export let type: 'input' | 'output'

	export let json: Tconection['json'] = {}

	const range = (N: number) => [...Array(N).keys()]
	const conection = (sfx: string, N: number) =>
		(json![sfx + (N + 1)] = { connections: [] })
</script>

{#each range(length) as i}
	<div class="{type}s">
		<div class="{type} {type}_{conection(type, i)}" />
	</div>
{/each}
