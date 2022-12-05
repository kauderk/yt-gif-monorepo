<script>
	import Editor from '$cmp/text-editor/Editor.svelte'
</script>

{#each new Array(5).fill(0).map((_, i) => i) as i}
	<Editor id='editor{i}'/>
{/each}
