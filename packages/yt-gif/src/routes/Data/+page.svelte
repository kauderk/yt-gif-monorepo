<script lang="ts">
	import { getBlockInfoByUID } from '$v3/lib/data/drawflow-roam-api-proxy'

	let value = 12
	let res: Awaited<ReturnType<typeof getBlockInfoByUID>>
</script>

<form
	on:submit|preventDefault={async () =>
		(res = await getBlockInfoByUID(value, true, true))}>
	<label for="text" id="text">getBlockInfoByUID</label>
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
