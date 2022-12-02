import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'
import type { RequireAtLeastOne } from '$lib/types/utilities'

export type Proxy = Partial<TBlockInfoRec>
export type connection = {
	inputs: { proxy: 'parents' }
	outputs: { proxy: 'children' }
}
type proxyProperties = connection[keyof connection]['proxy']
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
