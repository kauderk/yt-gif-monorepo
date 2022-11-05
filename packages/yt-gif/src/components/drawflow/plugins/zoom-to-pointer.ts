import type Drawflow from 'drawflow'

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
		editor.container.style.backgroundPosition = `${position.x}px ${position.y}px`
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

	const cord = editor.zoom * point

	editor.container.style.setProperty('--dfBackgroundSize', cord + 'px')
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