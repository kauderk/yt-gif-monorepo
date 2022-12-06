<script lang="ts">
	import { onMount } from 'svelte'
	import type { Readable } from 'svelte/store'
	import { createEditor, EditorContent, type Editor } from 'svelte-tiptap'
	import StarterKit from '@tiptap/starter-kit'
	import { SvelteCounterExtension } from './tiptap/extension/counter'

	let editor: Readable<Editor>

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit, SvelteCounterExtension],
			content: `
        <p>This is a prerendered HTML Content</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <p>By using web compoents we're able to serialize svelte components</p>
      `,
		})
	})
</script>

<div>
	<EditorContent editor={$editor} />
</div>

<style>
	div {
	}
</style>
