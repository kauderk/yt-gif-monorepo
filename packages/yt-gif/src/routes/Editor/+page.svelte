<script>
	import Editor from '$cmp/text-editor/Editor.svelte'
</script>

{#each new Array(1).fill(0).map((_, i) => i) as i}
	<div />
{/each}
<Editor />

<style>
	div {
		padding: 2em;
	}
</style>
