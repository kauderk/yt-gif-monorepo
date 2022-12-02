import { getNodeByID, getConnections } from './data'
import type { Nest, Params } from './types'

export function getNestedBlocks(params: Params) {
	return REC({
		rootUid: params.uid,
		node: getNodeByID(params)!,
		params,
		trace: { children: [], parents: [] },
	})
}

function REC(step: Nest) {
	const connections = getConnections(step)

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
