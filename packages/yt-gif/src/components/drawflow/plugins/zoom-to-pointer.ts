/*
	- the background has to follow the viewport/dragging [line 14]
	- get rid of the stiffness [line 24]
	like https://ayushk7.github.io/CodeWire/

	- the dragging stops working when leaving the canvas (blue rectangle), it should 
	behave like this https://jerosoler.github.io/Drawflow/ - even with a far away zoom
	Ctrl-Wheel
*/
import type Drawflow from '$cmp/drawflow/src/drawflow'

export function zoomToPointer(editor: Params) {
	let position = { x: 0, y: 0 }
	editor.zoom_enter = function (e: WheelEvent) {
		e.preventDefault()
		if (e.ctrlKey) {
			zoom(e, editor)
			DisplaceBG(position, editor)
		} else {
			CanvasWheel(e, editor)
		}
	}
	editor.on('translate', (pos: pos) => {
		position = {
			x: pos.x - position.x,
			y: pos.y - position.y,
		}
		editor.container.style.backgroundPosition = `${pos.x}px ${pos.y}px`
	})
}

function zoom(e: WheelEvent, editor: Params) {
	if (e.deltaY > 0) {
		// Zoom Out
		editor.zoom_out()
	} else {
		// Zoom In
		editor.zoom_in()
	}
}

function DisplaceBG(pos: pos, editor: Params) {
	const sum = pos.x * pos.x + pos.y * pos.y
	const point = Math.sqrt(sum)

	const cord = editor.zoom * 6.5
	const square = cord + 'em'

	editor.container.style.setProperty('background-size', `${square} ${square}`)
}

function CanvasWheel(e: WheelEvent, editor: Params) {
	if (e.deltaY > 0) {
		var moveAm = -40
		//Scroll up
	} else {
		//Scroll down
		var moveAm = 40
	}

	editor.canvas_y = editor.canvas_y + moveAm
	editor.dispatch('translate', {
		x: editor.canvas_x,
		y: editor.canvas_y,
	})
	editor.precanvas.style.transform =
		'translate(' +
		editor.canvas_x +
		'px, ' +
		editor.canvas_y +
		'px) scale(' +
		editor.zoom +
		')'
}

type pos = { x: n; y: n }
interface Params extends Drawflow {
	container: HTMLElement
	zoom_enter: (e: WheelEvent) => void
	precanvas: HTMLElement
	dispatch: Function
}
