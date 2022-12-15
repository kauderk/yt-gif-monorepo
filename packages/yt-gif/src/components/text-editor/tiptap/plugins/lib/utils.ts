import type { Editor } from 'svelte-tiptap'
import { derived, get, type Readable } from 'svelte/store'
export const toggleBold = (editor: Readable<Editor>) => {
	return () => get(editor).chain().focus().toggleBold().run()
}
export const toggleItalic = (editor: Readable<Editor>) => {
	return () => get(editor).chain().focus().toggleItalic().run()
}
export const toggleHeading = (editor: Readable<Editor>) => {
	return (level: 1 | 2 | 3 | 4 | 5 | 6) => {
		get(editor).chain().focus().toggleHeading({ level }).run()
	}
}

export const createActions = (editor: Readable<Editor>) => {
	const isActive = (name: string, attrs = {}) =>
		get(editor)?.isActive(name, attrs)!!
	return {
		toggleBold: toggleBold(editor),
		toggleItalic: toggleItalic(editor),
		toggleHeading: toggleHeading(editor),
		isActive,
	}
}
