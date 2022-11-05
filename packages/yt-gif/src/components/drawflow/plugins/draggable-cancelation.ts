import type Drawflow from 'drawflow'

// https://github.com/jerosoler/Drawflow/issues/530
export default function draggableCancelation(
	editor: Drawflow & {
		container: HTMLElement
		position: (this: Drawflow, ev: PointerEvent) => any
	}
) {
	function pointerdown(e: PointerEvent) {
		// @ts-ignore alright...
		if (!e.target?.matches('.parent-drawflow, .drawflow')) {
			return
		}
		editor.container.onpointermove = editor.position(e)
		editor.container.setPointerCapture(e.pointerId)
	}
	function pointerup(e: PointerEvent) {
		editor.container.onpointermove = null
		editor.container.releasePointerCapture(e.pointerId)
	}

	return {
		createListeners() {
			editor.container.addEventListener('pointerdown', pointerdown)
			editor.container.addEventListener('pointerup', pointerup)

			return () => {
				editor.container.removeEventListener('pointerdown', pointerdown)
				editor.container.removeEventListener('pointerup', pointerup)
			}
		},
	}
}

function Hovering(params: {
	update: () => boolean
	onEnter: Function
	onLeave: Function
}) {
	let _in = true
	let _out = false

	return function () {
		if (params.update()) {
			if (_out) {
				_out = false
				_in = true
				params.onEnter()
			}
		} else {
			_out = true
			if (_in) {
				_in = false
				params.onLeave()
			}
		}
	}
}
