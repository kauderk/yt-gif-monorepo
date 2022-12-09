<script lang="ts">
	import Editor from '$cmp/text-editor/svnotion/editor/index.svelte'
	export let GraphNodeID = ''
	const content = {
		type: 'doc',
		content: [
			{ type: 'paragraph' },
			{ type: 'paragraph' },
			{ type: 'paragraph' },
			{ type: 'paragraph' },
		],
	}
</script>

<div>
	<Editor {content} {id} />
</div>

<style>
	div {
		min-width: 250px;
	}
</style>
