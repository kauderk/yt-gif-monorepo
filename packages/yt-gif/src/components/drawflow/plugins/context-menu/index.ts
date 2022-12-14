/*
	right click should show options or a button to an action, like "save"
	https://github.com/jerosoler/Drawflow/issues/187
*/

import type Drawflow from '$cmp/drawflow/src/drawflow'
import { zIndex } from '../add-node-svelte/store'
import { get } from 'svelte/store'
import ContextMenu from './ContextMenu.svelte'

export function contextMenu(editor: Drawflow) {
	let contextMenu: ContextMenu
	editor.on('contextmenu', function (e) {
		const nodePlacement =
			e.target.closest('.drawflow_content_node') != null ||
			e.target.classList[0] === 'drawflow-node'
				? 'node'
				: null
		const canvasPlacement =
			e.target.closest('.parent-drawflow') != null ||
			e.target.classList[0] === 'parent-drawflow'
				? 'canvas'
				: null
		const placement = nodePlacement || canvasPlacement

		if (placement) {
			showConextMenu(e.clientX, e.clientY, placement)
		}
	})

	function showConextMenu(x: n, y: n, placement: 'node' | 'canvas') {
		//var pos_x = editor.pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
		//var pos_y = editor.pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
		var pos_x =
			x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().x *
				(editor.precanvas.clientWidth /
					(editor.precanvas.clientWidth * editor.zoom))
		var pos_y =
			y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom)) -
			editor.precanvas.getBoundingClientRect().y *
				(editor.precanvas.clientHeight /
					(editor.precanvas.clientHeight * editor.zoom))

		contextMenu?.$destroy?.()
		contextMenu = new ContextMenu({
			target: editor.precanvas!,
			props: {
				left: pos_x + 'px',
				top: pos_y + 'px',
				zIndex: get(zIndex) + 10,
				placement,
			},
		})
	}

	function unShowConextMenu() {
		contextMenu?.$destroy?.()
	}

	editor.on('click', function (event) {
		if (event.target.closest('#contextmenu') === null) {
			unShowConextMenu()
		}
	})
}
