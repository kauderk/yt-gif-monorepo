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
	const conection = (sfx: string, N: number) => {
		const idx = sfx + '_' + N
		json![idx] = { connections: [] }
		return idx
	}
</script>

{#each range(length) as i}
	<div class="{type}s">
		<div class="{type} {conection(type, i)}" />
	</div>
{/each}
