<script lang="ts">
	import { getBlockParentUids } from '$v3/lib/data/drawflow-roam-api-proxy'

	let value = 3
	let res: Awaited<ReturnType<typeof getBlockParentUids>>
	$: console.log(res)
	$: console.log(JSON.stringify(res))
</script>

<form
	on:submit|preventDefault={async () =>
		(res = await getBlockParentUids(String(value)))}>
	<label for="text" id="text">getBlockParentUids</label>
	<input type="text" placeholder="7" bind:value />
	<button type="submit">submit</button>
</form>
{JSON.stringify(res)}

<style>
	input {
		background: grey;
	}
	form {
		max-width: 60ch;
	}
</style>
