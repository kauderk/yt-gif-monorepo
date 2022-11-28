import type { DrawFlowEditorMode, DrawflowNode } from 'drawflow'
import type { DrawflowExport } from './types'
type Nl<T> = T | null
type NlHTML = Nl<HTMLElement>
type FalsyHTML = Nl<HTMLElement | undefined>
export type ET<T> = T & { target: HTMLElement }

export class DrawFlowDefault {
	/**
	 * Active reroute
	 * @default false
	 */
	reroute = false

	/**
	 * Fix adding points
	 * @default false
	 */
	reroute_fix_curvature = false

	/**
	 * Curvature
	 * @default 0.5
	 */
	curvature = 0.5

	/**
	 * Curvature reroute first point and last point
	 * @default 0.5
	 */
	reroute_curvature_start_end = 0.5

	/**
	 * Curvature reroute
	 * @default 0.5
	 */
	reroute_curvature = 0.5

	/**
	 * Width of reroute
	 * @default 6
	 */
	reroute_width = 6

	/**
	 * Width of line
	 * @default 5
	 */
	line_path = 5

	/**
	 * Force the first input to drop the connection on top of the node
	 * @default false
	 */
	force_first_input = false

	/**
	 * edit or fixed mode
	 * @default edit
	 */
	editor_mode: DrawFlowEditorMode = 'edit'
	module = 'Home'

	/**
	 * Default zoom
	 * @default 1
	 */
	zoom = 1

	/**
	 * Default zoom max
	 * @default 1.6
	 */
	zoom_max = 1.6

	/**
	 * Default zoom min
	 * @default 0.5
	 */
	zoom_min = 0.5

	/**
	 * Default zoom value update
	 * @default 0.1
	 */
	zoom_value = 0.1

	/**
	 * Default zoom last value
	 * @default 1
	 */
	zoom_last_value = 1

	/**
	 * Drag nodes on click inputs
	 * @default true
	 */
	draggable_inputs = true

	/**
	 * Canvas origin x coordinate
	 */
	canvas_x = 0
	/**
	 * Canvas origin x coordinate
	 */
	canvas_y = 0

	pos_x = 0
	pos_x_start = 0
	pos_y = 0
	pos_y_start = 0
	mouse_x = 0
	mouse_y = 0

	/**
	 * Graph data object
	 */
	drawflow: DrawflowExport = { drawflow: { Home: { data: {} } } }

	// private
	events: { [key: s]: { listeners: Function[] } } = {}

	// html: s | object (special cases for Vue of Svelte)
	noderegister: { [key: s]: { html: s | object; props: any; options: any } } =
		{}

	container: HTMLElement
	/**
	 * Vue constructor
	 */
	render: any = null
	parent: NlHTML = null
	precanvas: NlHTML = null
	ele_selected: FalsyHTML | Element = null
	node_selected: NlHTML = null
	connection_ele: Nl<SVGSVGElement> = null
	connection_selected: NlHTML = null
	first_click: NlHTML = null
	nodeId = 1

	// unknown
	drag = false
	drag_point = false
	editor_selected = false
	connection = false
	useuuid = false

	// Mobile
	evCache = new Array()
	prevDiff = -1

	constructor(
		container: HTMLElement,
		render: NlHTML = null,
		parent: NlHTML = null
	) {
		this.container = container
		this.parent = parent
		this.render = render
	}
}
