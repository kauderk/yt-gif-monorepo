import data from '$cmp/drawflow/data.json'
import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'
import type { RequireAtLeastOne } from '$lib/types/utilities'
import { ObjectKeys } from '$lib/utils'

type Proxy = Partial<TBlockInfoRec>
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
type connection = {
	inputs: { proxy: 'parents' }
	outputs: { proxy: 'children' }
}
type proxyProperties = connection[keyof connection]['proxy']
interface Params {
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

function getNestedBlocks(params: Params) {
	return REC({
		rootUid: params.uid,
		node: getNodeByID(params)!,
		params,
		trace: { children: [], parents: [] },
	})
}

function getConnectionRow(
	node: DrawflowNode,
	channel: keyof Params['connection']
): s[][] {
	return (
		Object.values(node?.[channel]).map(out =>
			out.connections.map((o: any) => o.node)
		) ?? []
	)
}

interface Nest {
	node: DrawflowNode
	rootUid: ID
	trace: { children: ID[]; parents: ID[] }
	params: Params
}
function REC(step: Nest) {
	const connections = ObjectKeys(step.params.connection).map(c =>
		createConnectionLookup(step, c)
	)

	for (const iterator of connections) {
		/**
		 * blocks can have multiple outputs
		 */
		//step.trace: s[] = [] // this resets, and only tracks the last one, yet it still works...
		for (const row of iterator.rows) {
			/**
			 * map the uid to a valid node
			 * then trace it to avoid stack overflows
			 * then walk down the children hierarchy
			 */
			for (const uid of row) {
				const nextNode = getNodeByID({ ...step.params, uid })
				const canWalkDown =
					!step.trace[iterator.key].includes(uid) &&
					step.rootUid != uid

				// once you are in, block the way for your possible self
				if (nextNode && canWalkDown) {
					step.trace[iterator.key].push(uid)

					const rec = REC({ ...step, node: nextNode })

					iterator.branch.push(rec)
				}
				// you found your self, show the properties but not the children
				else if (nextNode && !canWalkDown) {
					iterator.branch.push(step.params.query(nextNode))
				}
			}
		}
	}

	return {
		...step.params.query(step.node),
		...connections.reduce((acc, crr) => {
			return {
				...acc,
				[crr.key]: crr.branch,
			}
		}, {}),
	}
}

function createConnectionLookup(step: Nest, connection: 'inputs' | 'outputs') {
	const branch = Array<Proxy>()
	const rows = getConnectionRow(step.node, connection)
	const key = step.params.connection[connection]?.proxy!
	return { rows, branch, key }
}

function getNodeByID({
	uid,
	module = 'Home',
}: Params): DrawflowNode | undefined {
	// @ts-ignore
	if (module) return data.drawflow[module].data[uid]

	// @ts-ignore
	return (
		Object.values(data.drawflow)
			.map(m => Object.values(m.data))

			// @ts-ignore
			.flat(Infinity)
			// @ts-ignore
			.find(o => o.id == uid)
	)
}
