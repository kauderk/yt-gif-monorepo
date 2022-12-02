import data from '$cmp/drawflow/data.json'
import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'

export const getBlockInfoByUID = async (
	uid: ID,
	withChildren?: boolean,
	withParents?: boolean
): Promise<TBlockInfoRec[][] | null> => {
	debugger
	const params: Params = {
		module: 'Other',
		uid,
		connection: 'outputs', // children
	}

	if (withChildren) {
		const search = getNestedBlocks(params)
		if (withParents) {
			const parents = getNestedBlocks({ ...params, connection: 'inputs' })
			return [
				[
					{
						...search,
						parents: parents.children,
					},
				],
			]
		}
		return [[search]]
	} else {
		return [[getBlockInterface(getNodeByID(params)!)]]
	}
}
interface Params {
	uid: ID
	module: 'Home' | 'Other'
	connection: 'inputs' | 'outputs'
}

function getNestedBlocks(params: Params) {
	return REC({
		rootUid: params.uid,
		node: getNodeByID(params)!,
		params,
	})
}

function getConnectionRow(
	node: DrawflowNode,
	channel: Params['connection']
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

	params: Params
}
function REC(step: Nest) {
	// lookups
	const children = Array<TBlockInfoRec>()
	const outputRows = getConnectionRow(step.node, step.params.connection)

	/**
	 * blocks can have multiple outputs
	 */
	for (const row of outputRows) {
		const trace: s[] = [] // this resets, and only tracks the last one, yet it still works...

		/**
		 * map the uid to a valid node
		 * then trace it to avoid stack overflows
		 * then walk down the children hierarchy
		 */
		for (const uid of row) {
			const nextNode = getNodeByID({ ...step.params, uid })
			const canWalkDown = !trace.includes(uid) && step.rootUid != uid

			// once you are in, block the way for your possible self
			if (nextNode && canWalkDown) {
				trace.push(uid)

				const rec = REC({ ...step, node: nextNode })

				children.push(rec)
			}
			// you found your self, show the properties but not the children
			else if (nextNode && !canWalkDown) {
				children.push(getBlockInterface(nextNode))
			}
		}
	}

	return {
		...getBlockInterface(step.node),
		children,
	}
}

function getNodeByID({ uid, module }: Params): DrawflowNode | undefined {
	// @ts-ignore
	return data.drawflow[module].data[uid]
}

function getBlockInterface(node: DrawflowNode) {
	return {
		open: node.open ?? false,
		order: node.order ?? 0,
		string: node.name,
		uid: node.id.toString(),
		children: [],
	}
}
