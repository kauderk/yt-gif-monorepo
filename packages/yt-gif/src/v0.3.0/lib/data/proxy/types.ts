import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'
import type { RequireAtLeastOne, RequireOnlyOne } from '$lib/types/utilities'

export type Proxy = Partial<TBlockInfoRec>
export type connection = {
	inputs: { proxy: 'parents' }
	outputs: { proxy: 'children' }
}
export type proxyProperties = connection[keyof connection]['proxy']
export interface Params {
	uid: ID
	module?: 'Home' | 'Other'
	walk: 'flat' | 'explicit'
	connection: RequireAtLeastOne<connection>
	/**
	 * @return RequireAtLeastOne property
	 */
	query: (
		node: DrawflowNode,
		payload?: Payload
	) => RequireAtLeastOne<Partial<Omit<TBlockInfoRec, proxyProperties>>>
}
export interface Nest {
	payload?: Payload
	node: DrawflowNode
	rootUid: ID
	trace: { children: ID[]; parents: ID[] }
	params: Params
}
export type Payload = {
	/**
	 * Incoming - Origin
	 */
	plug: {
		uid: s
		connection: s
	}
	/**
	 * Target - Destination
	 */
	outlet: {
		uid: s
		connection: s
	}
}
interface DirectionalNest {
	nest: Partial<TBlockInfoRec> & RequireAtLeastOne<Partial<TBlockInfoRec>>
}
export interface UnidirectionalNest extends DirectionalNest {
	connection: RequireOnlyOne<connection>
}
export interface MultiDirectionalNest extends DirectionalNest {
	connection: RequireAtLeastOne<connection>
}

export interface ReduceQuery extends UnidirectionalNest {
	/**
	 * 	FIXME how do you grab ReduceQuery["nest"] to type query(block: ReduceQuery["nest"])
	 */
	query: (
		block: any,
		parent?: any
	) => unknown | RequireAtLeastOne<Partial<TBlockInfoRec>> | PropertyKey
}

export function getTypeofProxy<
	P extends { connection: RequireAtLeastOne<connection> }
>() {
	type connections = P['connection'][keyof P['connection']]
	type proxy = connections[keyof connections] extends PropertyKey
		? connections[keyof connections]
		: never
	return <proxy>{}
}
