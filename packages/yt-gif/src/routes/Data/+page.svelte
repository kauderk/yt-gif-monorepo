<script lang="ts">
	import { getBlockInfoByUID } from '$v3/lib/data/drawflow-roam-api-proxy'

	let value = 6
	let res: ReturnType<typeof getBlockInfoByUID>
</script>

<form on:submit|preventDefault={() => (res = getBlockInfoByUID(value))}>
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
