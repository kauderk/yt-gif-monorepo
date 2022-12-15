import type Drawflow from '$cmp/drawflow/src/drawflow'
import { items } from '../cmp/ctx'

export function dragAndDrop(editor: Drawflow) {
	let mobile_item_selec = ''
	let mobile_last_move: TouchEvent
	function positionMobile(ev: any) {
		mobile_last_move = ev
	}

	function allowDrop(ev: any) {
		ev.preventDefault()
	}

	function drag(ev: any) {
		if (ev.type === 'touchstart') {
			mobile_item_selec = ev.target
				.closest('.drag-drawflow')
				.getAttribute('data-node')
		} else {
			ev.dataTransfer.setData('node', ev.target.getAttribute('data-node'))
		}
	}

	function drop(ev: any) {
		if (ev.type === 'touchend') {
			let parentdrawflow = document
				.elementFromPoint(
					mobile_last_move.touches[0].clientX,
					mobile_last_move.touches[0].clientY
				)
				?.closest('#drawflow')
			if (parentdrawflow != null) {
				addNodeToDrawFlow(
					mobile_item_selec,
					mobile_last_move.touches[0].clientX,
					mobile_last_move.touches[0].clientY
				)
			}
			mobile_item_selec = ''
		} else {
			ev.preventDefault()
			let data = ev.dataTransfer?.getData('node')
			addNodeToDrawFlow(data, ev.clientX, ev.clientY)
		}
	}

	function addNodeToDrawFlow(key: s, x: n, y: n) {
		if (editor.editor_mode === 'fixed') {
			return false
		}
		x =
			x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom))
		y =
			y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom))

		const id = items.find(o => o.GraphNodeID == key)?.GraphNodeID
		if (!id) {
			return console.warn(
				'Drawflow: DragAndDrop - AddNode. id is undefined'
			)
		}
		editor.addNode({
			id: id,
			connections: {
				inputs: 1,
				outputs: 1,
			},
			cords: {
				y,
				x,
			},
			data: {},
			node: {
				classoverride: key,
				html: key,
				typenode: 'svelte',
			},
		})
	}

	return {
		drop,
		positionMobile,
		drag,
		allowDrop,
	}
}

export function AssignEvents(
	root: HTMLElement,
	dnd: ReturnType<typeof dragAndDrop>
) {
	if (!root?.getElementsByClassName) return
	/* Mouse and Touch Actions */
	let elements = Array.from(
		root.getElementsByClassName('drag-drawflow')
	) as HTMLElement[]

	for (const element of elements) {
		DnD_Drawflow(element, dnd)
	}
}
export function DnD_Drawflow(
	element: HTMLElement,
	dnd: ReturnType<typeof dragAndDrop>
) {
	element.addEventListener('touchend', dnd.drop, false)
	element.addEventListener('touchmove', dnd.positionMobile, false)
	element.addEventListener('touchstart', dnd.drag, false)

	return {
		destroy() {
			element.removeEventListener('touchend', dnd.drop, false)
			element.removeEventListener('touchmove', dnd.positionMobile, false)
			element.removeEventListener('touchstart', dnd.drag, false)
		},
	}
}
