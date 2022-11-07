import type Drawflow from '$cmp/drawflow/src/drawflow'
import { nodeEl } from '../../lib/utils'

// https://github.com/jerosoler/Drawflow/issues/322#issuecomment-1133036432
export function selectMultiple(
	editor: Drawflow & { node_selected: El; module: n; precanvas: El; drag: b }
) {
	const selection = new Array<n | s>()

	editor.on('clickEnd', e => {
		const shiftKey = e.shiftKey
		if (!shiftKey) {
			return remove(selection)
		}

		if (editor.node_selected !== null) {
			const res = tryPushSelected()
			if (!res.ok) {
				selection.splice(res.index, 1)
				// nodeUnselected
				nodeEl(res.id).classList.remove('selected')
			}
		} else {
			remove(selection)
		}
		selection.forEach(eleN => nodeEl(eleN).classList.add('selected'))
	})

	let last_x = 0
	let last_y = 0
	editor.on('mouseMove', ({ x, y }) => {
		if (editor.node_selected && editor.drag) {
			editor.node_selected.classList.add('selected')
			tryPushSelected()
			selection.forEach(eleN => {
				if (eleN != editor.node_selected.id.slice(5)) {
					const node = nodeEl(eleN)
					let xnew =
						((last_x - x) * editor.precanvas.clientWidth) /
						(editor.precanvas.clientWidth * editor.zoom)
					let ynew =
						((last_y - y) * editor.precanvas.clientHeight) /
						(editor.precanvas.clientHeight * editor.zoom)

					node.style.top = node.offsetTop - ynew + 'px'
					node.style.left = node.offsetLeft - xnew + 'px'

					editor.drawflow.drawflow[editor.module].data[eleN].pos_x =
						node.offsetLeft - xnew
					editor.drawflow.drawflow[editor.module].data[eleN].pos_y =
						node.offsetTop - ynew
					editor.updateConnectionNodes(`node-${eleN}`)
				}
			})
		}
		last_x = x
		last_y = y
	})

	function tryPushSelected() {
		const nodeId = editor.node_selected.id.slice(5)
		const indexSelected = selection.indexOf(nodeId)
		const ok = indexSelected === -1
		if (ok) {
			selection.push(nodeId)
		}
		return { index: indexSelected, id: nodeId, ok }
	}
}
function remove(nodesSelected: (string | number)[]) {
	nodesSelected.forEach(eleN => nodeEl(eleN).classList.remove('selected'))
	nodesSelected.splice(0, nodesSelected.length)
}
