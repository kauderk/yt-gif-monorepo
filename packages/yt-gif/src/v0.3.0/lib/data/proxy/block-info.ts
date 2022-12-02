import type { ID } from '$cmp/drawflow/src/drawflow/types'
import type { Params, Proxy } from './types'
import { getNestedBlocks } from './recursive'
import { getNodeByID } from './data'

export const getBlockInfoByUID = async (
	uid: ID,
	withChildren?: boolean,
	withParents?: boolean
): Promise<Proxy[][] | null> => {
	const params: Params = {
		module: 'Home',
		uid,
		connection: { inputs: { proxy: 'parents' } },
		query(node) {
			return {
				uid: node.id.toString(),
			}
		},
	}

	if (withChildren) {
		if (withParents) {
			const parents = getNestedBlocks({
				...params,
				connection: {
					outputs: { proxy: 'children' },
					inputs: { proxy: 'parents' },
				},
			})
			return [[parents]]
		}
		const children = getNestedBlocks(params)
		return [[children]]
	} else {
		return [[params.query(getNodeByID(params)!)]]
	}
}

export const queryDrawflow = (params: Params) => {
	const search = getNestedBlocks(params)
	return search
}
