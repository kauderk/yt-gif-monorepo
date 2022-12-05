<script context="module">
	let count = 0
</script>

<script>
	import Editor from '$cmp/text-editor/Editor.svelte'
	count = +1
</script>

<div class="wrapper">
	<slot name="player" />
	<Editor id="editor{count}" />
</div>

<style>
</style>
