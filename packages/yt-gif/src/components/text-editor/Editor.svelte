<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import type { Readable } from 'svelte/store'
	import { createEditor, EditorContent, type Editor } from 'svelte-tiptap'
	import StarterKit from '@tiptap/starter-kit'

	let editor: Readable<Editor>

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit],
			content: `Hello world! sdlkfjsdlkfjksld fjkl`,
		})
	})
</script>

<EditorContent editor={$editor} />
