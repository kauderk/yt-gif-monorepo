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
	connection: RequireAtLeastOne<connection>
	/**
	 * @return RequireAtLeastOne property
	 */
	query: (
		node: DrawflowNode
	) => RequireAtLeastOne<Partial<Omit<TBlockInfoRec, proxyProperties>>>
}
export interface Nest {
	node: DrawflowNode
	rootUid: ID
	trace: { children: ID[]; parents: ID[] }
	params: Params
}
export interface ReduceQuery {
	nested: TBlockInfoRec[]
	connection: RequireOnlyOne<connection>
	query: (
		block: TBlockInfoRec
	) => RequireAtLeastOne<Partial<TBlockInfoRec>> | PropertyKey
}
