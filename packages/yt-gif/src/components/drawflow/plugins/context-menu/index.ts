/*
	right click should show options or a button to an action, like "save"
	https://github.com/jerosoler/Drawflow/issues/187
*/

import type Drawflow from '$cmp/drawflow/src/drawflow'
import { zIndex } from '../add-node-svelte/store'
import { get } from 'svelte/store'
import './style.scss'

export function contextMenu(editor: Drawflow) {
	editor.on('contextmenu', function (event) {
		if (
			event.target.closest('.drawflow_content_node') != null ||
			event.target.classList[0] === 'drawflow-node'
		) {
			showConextMenu(event.clientX, event.clientY)
		}
	})

	function showConextMenu(x, y) {
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

		var contextmenu = document.createElement('div')
		contextmenu.id = 'contextmenu'
		contextmenu.innerHTML = '<ul><li>Option 1</li><li>Option 2</li></ul>'
		contextmenu.style.display = 'block'

		contextmenu.style.left = pos_x + 'px'
		contextmenu.style.top = pos_y + 'px'
		contextmenu.style.zIndex = `${get(zIndex) + 10}`

		editor.precanvas.appendChild(contextmenu)
	}

	function unShowConextMenu() {
		var contextmenu = document.getElementById('contextmenu')
		if (contextmenu != null) {
			contextmenu.remove()
		}
	}

	editor.on('click', function (event) {
		if (event.target.closest('#contextmenu') === null) {
			unShowConextMenu()
		}
	})
}
