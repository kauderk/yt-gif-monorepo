import data from '$cmp/drawflow/data.json'
import type { DrawflowNode, ID } from '$cmp/drawflow/src/drawflow/types'

export const getBlockInfoByUID = async (
	uid: ID,
	withChildren?: boolean,
	withParents?: boolean
): Promise<TBlockInfoRec[][] | null> => {
	const module = 'Other'

	if (withChildren) {
		//if(withParents)
		return [[getBLockWithChildren(uid, module)]]
	} else {
		return [[getBlockInterface(getNodeByID(uid, module)!)]]
	}
}
function getBLockWithChildren(uid: ID, module: Nest['module']) {
	return REC({
		rootUid: uid,
		node: getNodeByID(uid, module)!,
		module,
	})
}

function getOutputRows(node: DrawflowNode) {
	// FIXME: window
	// should start at 0

	return (
		Object.values(node?.outputs).map(out =>
			out.connections.map(o => o.node)
		) ?? []
	)
}

interface Nest {
	node: DrawflowNode
	rootUid: ID
	module: 'Home' | 'Other'
}
function REC(step: Nest) {
	// lookups
	const children = Array<TBlockInfoRec>()
	const outputRows = getOutputRows(step.node)

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
			const nextNode = getNodeByID(uid, step.module)
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

function getNodeByID(id: ID, module: s): DrawflowNode | undefined {
	// @ts-ignore
	return data.drawflow[module].data[id]
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
