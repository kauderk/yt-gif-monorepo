import type {
	ConnectionEvent,
	ConnectionStartEvent,
	MousePositionEvent,
} from 'drawflow'

// https://stackoverflow.com/a/54606942/13914180

type LifeCycle = {
	/**
	 *
	 * @param eventName
	 * @param callback (event: id of Node)
	 */
	/* tslint:disable:unified-signatures */
	(eventName: 'nodeCreated', callback: (event: number) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id of Node)
	 */
	(eventName: 'nodeRemoved', callback: (event: number) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback
	 */
	(eventName: 'nodeMoved', callback: (event: object) => void): void
}
type Selection = {
	/**
	 *
	 * @param eventName
	 * @param callback (event: id of Node)
	 */
	(eventName: 'nodeSelected', callback: (event: number) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: true)
	 */
	(eventName: 'nodeUnselected', callback: (event: boolean) => void): void
}
type Connections = {
	/**
	 * Called when starting to create a connection
	 * @param eventName
	 * @param callback
	 */
	(
		eventName: 'connectionStart',
		callback: (event: ConnectionStartEvent) => void
	): void
	/**
	 * Called when the connection creation was canceled
	 * @param eventName
	 * @param callback (event: true)
	 */
	(eventName: 'connectionCancel', callback: (event: boolean) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id's of nodes and output/input selected)
	 */
	(
		eventName: 'connectionCreated',
		callback: (event: ConnectionEvent) => void
	): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id's of nodes and output/input selected)
	 */
	(
		eventName: 'connectionRemoved',
		callback: (event: ConnectionEvent) => void
	): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id's of nodes and output/input selected)
	 */
	(
		eventName: 'connectionSelected',
		callback: (event: ConnectionEvent) => void
	): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: true)
	 */
	(
		eventName: 'connectionUnselected',
		callback: (event: boolean) => void
	): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id of Node output)
	 */
	(eventName: 'addReroute', callback: (event: number) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: id of Node output)
	 */
	(eventName: 'removeReroute', callback: (event: number) => void): void
}
type Modules = {
	/**
	 *
	 * @param eventName
	 * @param callback (event: name of Module)
	 */
	(eventName: 'moduleCreated', callback: (event: string) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: name of Module)
	 */
	(eventName: 'moduleChanged', callback: (event: string) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: name of Module)
	 */
	(eventName: 'moduleRemoved', callback: (event: string) => void): void
	/**
	 * Finish import
	 * @param eventName
	 * @param callback
	 */
	(eventName: 'import', callback: (event: object) => void): void
	/**
	 * Data export
	 * @param eventName
	 * @param callback
	 */
	(eventName: 'export', callback: (event: object) => void): void
	/* tslint:enable:unified-signatures */
}
type Actions = {
	/**
	 * Click second button mouse event
	 * @param eventName
	 * @param callback
	 */
	(eventName: 'contextmenu', callback: (event: object) => void): void

	/**
	 *
	 * @param eventName
	 * @param callback (event: keyboard event)
	 */
	(eventName: 'keydown', callback: (event: KeyboardEvent) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: Level of zoom)
	 */
	(eventName: 'zoom', callback: (event: object) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: position)
	 */
	(
		eventName: 'translate',
		callback: (event: MousePositionEvent) => void
	): void
}

type Transform = {
	/**
	 *
	 * @param eventName
	 * @param callback (event: mouse event)
	 */
	(eventName: 'click', callback: (event: MouseEvent) => void): void
	/**
	 * Once the click changes have been made
	 * @param eventName
	 * @param callback
	 */
	(eventName: 'clickEnd', callback: (event: object) => void): void
	/**
	 *
	 * @param eventName
	 * @param callback (event: position)
	 */
	(
		eventName: 'mouseMove',
		callback: (event: MousePositionEvent) => void
	): void
}

import type {
	UnionToIntersection,
	OverloadParameters,
} from '$lib/types/overloads'
// https://github.com/microsoft/TypeScript/issues/34933
export type OnEventsUnion =
	| LifeCycle
	| Selection
	| Connections
	| Modules
	| Actions
	| Transform

export type OnEvents = UnionToIntersection<OnEventsUnion>
export type EventNames = OverloadParameters<OnEventsUnion>[0]
export type Payloads = Parameters<OverloadParameters<OnEventsUnion>[1]>

// can't find a way to type the payload at
// Drawflow.dispatch(eventName, payload)
export type Dispatch = [eventName: EventNames, payload: Payloads]
