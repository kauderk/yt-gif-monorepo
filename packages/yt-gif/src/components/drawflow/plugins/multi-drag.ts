import type Drawflow from 'drawflow'
import Selectables from './selectables'
import { nodeEl } from '../lib/utils'

// https://github.com/jerosoler/Drawflow/issues/322#issuecomment-993469501
export function multiDrag(
	editor: Drawflow & { nodeId: n; editor_selected: b }
) {
	let is_multiselect = false
	let mult_arr: n[] = []

	let multiselect_dict = new Map<n, { pos_x: n; pos_y: n }>()
	let drag_start = false
	let active_node_id: n

	let dr = new Selectables({
		zone: '#drawflow',
		elements: ['.drawflow-node', '.title-box'],

		selectedClass: 'active',

		key: 'altKey',
		moreUsing: 'altKey',

		start: function (e: KeyboardEvent) {
			if (e.altKey) {
				is_multiselect = true
				editor.editor_selected = false
				editor.editor_mode = 'fixed'
				//console.log('Starting selection on ' + this.elements + ' in ' + this.zone);
			}
		},

		stop: function () {
			editor.editor_mode = 'edit'
			is_multiselect = false
			//console.log('Finished selecting   ' + this.elements + ' in ' + this.zone);
		},

		onSelect: function (el: El) {
			if (el.id.includes('node-') == true) {
				let id = parseInt(el.id.charAt(el.id.length - 1))
				nodeEl(id).addEventListener('mousedown', node_mousedown, false)
				nodeEl(id).addEventListener('mouseup', node_mouseup, false)
				mult_arr.push(id)
			}
			//console.log('onselect', el);
		},

		onDeselect: function (el: El) {
			node_remove_listener(el)
			//console.log('ondeselect', el);
		},

		enabled: true,
	})

	function node_remove_listener(el: Element) {
		if (el.id.includes('node-') == true) {
			let temp_arr = []
			for (let value of mult_arr) {
				let id = parseInt(el.id.charAt(el.id.length - 1))
				if (value == id) {
					nodeEl(value).removeEventListener(
						'mousedown',
						node_mousedown,
						false
					)
					nodeEl(value).removeEventListener(
						'mouseup',
						node_mouseup,
						false
					)
					temp_arr.push(value)
				}
			}
			for (let value of temp_arr) {
				mult_arr = mult_arr.filter(function (ele) {
					return ele != value
				})
			}
		}
	}

	function node_mousedown(e: any) {
		if (e.type === 'mousedown') {
			drag_start = true
			active_node_id = parseInt(
				e.currentTarget.id.charAt(e.currentTarget.id.length - 1)
			)

			for (let i = 1; i <= editor.nodeId; i++) {
				if (
					typeof editor.drawflow.drawflow.Home.data[i] !== 'undefined'
				) {
					let node = editor.getNodeFromId(active_node_id)
					multiselect_dict.set(i, {
						pos_x:
							editor.drawflow.drawflow.Home.data[i].pos_x -
							node.pos_x,
						pos_y:
							editor.drawflow.drawflow.Home.data[i].pos_y -
							node.pos_y,
					})
				}
			}
		}
	}

	function node_mouseup(e: Event) {
		if (e.type === 'mouseup') {
			drag_start = false
			active_node_id = -1
			multiselect_dict.clear()
		}
	}

	function clear_selection() {
		dr.foreach(dr.items, function (el: El) {
			el.classList.remove(dr.options.selectedClass)
			node_remove_listener(el)
		})
	}

	const toggle = () => {
		dr.disable()
		dr.enable()
	}

	editor.on('nodeCreated', function (id) {
		console.log('Node created ' + id)
		toggle()
	})

	editor.on('nodeRemoved', function (id) {
		console.log('Node removed ' + id)
		toggle()
	})

	editor.on('connectionCreated', function () {
		toggle()
	})

	editor.on('connectionRemoved', function () {
		toggle()
	})

	editor.on('mouseMove', function () {
		//console.log('Position mouse x:' + position.x + ' y:'+ position.y);
		if (drag_start == true) {
			for (let i of mult_arr) {
				if (i != active_node_id) {
					if (
						typeof editor.drawflow.drawflow.Home.data[i] !==
						'undefined'
					) {
						let active = editor.getNodeFromId(active_node_id)
						let elem = nodeEl(i).children[1].children[0]
						let pos_x = multiselect_dict.get(i)?.pos_x ?? 0
						let pos_y = multiselect_dict.get(i)?.pos_y ?? 0
						editor.drawflow.drawflow.Home.data[i].pos_x =
							active.pos_x + pos_x
						editor.drawflow.drawflow.Home.data[i].pos_y =
							active.pos_y + pos_y
						nodeEl(i).style.left = active.pos_x + pos_x + 'px'
						nodeEl(i).style.top = active.pos_y + pos_y + 'px'
						editor.updateConnectionNodes(`node-${i}`)
					}
				}
			}
		}
	})

	return { clear_selection }
}
