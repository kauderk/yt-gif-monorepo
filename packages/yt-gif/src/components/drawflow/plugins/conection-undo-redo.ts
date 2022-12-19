import type { ConnectionEvent } from 'drawflow'
import type Drawflow from '../src/drawflow'

// https://github.com/jerosoler/Drawflow/issues/31
export function undoRedo(editor: Drawflow) {
	const history: {
		connectionCreated?: ConnectionEvent[]
		connectionRemoved?: ConnectionEvent[]
	}[] = []
	let historyPosition = -1
	let fixHistory = false

	function undo() {
		if (historyPosition < 0) {
			console.log('Finish')
			return
		}
		const redoElement = history[historyPosition]
		const redoElementName = Object.keys(redoElement)
		let d: ConnectionEvent

		switch (redoElementName[0]) {
			case 'connectionCreated':
				d = history[historyPosition]['connectionCreated']![0]
				fixHistory = true
				editor.removeSingleConnection(
					d.output_id,
					d.input_id,
					d.output_class,
					d.input_class
				)
				break
			case 'connectionRemoved':
				d = history[historyPosition]['connectionRemoved']![0]
				fixHistory = true
				editor.addConnection(
					d.output_id,
					d.input_id,
					d.output_class,
					d.input_class
				)
				break
		}
		historyPosition--
	}

	function redo() {
		if (historyPosition === history.length - 1) {
			console.log('Last')
			return
		}
		historyPosition++
		const redoElement = history[historyPosition]
		const redoElementName = Object.keys(redoElement)
		let d: ConnectionEvent

		switch (redoElementName[0]) {
			case 'connectionCreated':
				d = history[historyPosition]['connectionCreated']![0]
				fixHistory = true
				editor.addConnection(
					d.output_id,
					d.input_id,
					d.output_class,
					d.input_class
				)
				break

			case 'connectionRemoved':
				d = history[historyPosition]['connectionRemoved']![0]
				fixHistory = true
				editor.removeSingleConnection(
					d.output_id,
					d.input_id,
					d.output_class,
					d.input_class
				)
				break
		}
	}

	editor.on(
		'connectionCreated',
		function ({ output_id, input_id, output_class, input_class }) {
			if (!fixHistory) {
				history.push({
					connectionCreated: [
						{ output_id, input_id, output_class, input_class },
					],
				})
				historyPosition++
			} else {
				fixHistory = false
			}
		}
	)

	editor.on('connectionRemoved', function (obj) {
		const { output_id, input_id, output_class, input_class } = obj
		if (!fixHistory) {
			history.push({
				connectionRemoved: [
					{ output_id, input_id, output_class, input_class },
				],
			})
			historyPosition++
		} else {
			fixHistory = false
		}
	})

	// @ts-ignore FIXME: type this thing!
	history.push(editor.export())
	history.splice(-7) // Fix history

	const zUndo = getKeyDown('z', undo)
	const yRedo = getKeyDown('y', redo)
	let target = window

	function addListeners(_target?: any) {
		target = _target ?? target
		target.addEventListener('keydown', zUndo)
		target.addEventListener('keydown', yRedo)
	}
	function removeListeners() {
		target.removeEventListener('keydown', zUndo)
		target.removeEventListener('keydown', yRedo)
	}
	return {
		undo,
		redo,
		addListeners,
		removeListeners,
		/**
		 * addListeners
		 * @returns removeListeners
		 */
		createListeners() {
			addListeners()
			return removeListeners
		},
	}
}

function getKeyDown(key = 'z', cb: Function) {
	return function (event: any) {
		if (event.ctrlKey && event.key === key) {
			cb()
		}
	}
}
