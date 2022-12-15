import type Drawflow from '$cmp/drawflow/src/drawflow'

export function lockToggle(editor: Drawflow) {
	return function (e: Event) {
		const locked = editor.editor_mode == 'fixed'

		editor.editor_mode = locked ? 'edit' : 'fixed'
		const icon = locked ? 'fa-lock' : 'fa-lock-locked'

		;(e.currentTarget as HTMLElement)
			.querySelector('[data-icon]')
			?.classList.add(icon)
	}
}

export function nodeEl(indexId: n | s) {
	return document.getElementById('node-' + indexId)!
}

export const range = (N: number) => [...Array(N).keys()]
