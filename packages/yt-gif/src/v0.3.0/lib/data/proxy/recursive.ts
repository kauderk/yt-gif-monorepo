import type { RequireAtLeastOne, RequireOnlyOne } from '$lib/types/utilities'
import { ObjectValues } from '$lib/utils'
import { getNodeByID, getConnections } from './data'
import type { ReduceQuery, Nest, Params } from './types'

export function getNestedBlocks<P extends Params>(params: P) {
	type connections = P['connection'][keyof P['connection']]
	type proxy = connections[keyof connections] extends PropertyKey
		? connections[keyof connections]
		: never

	return REC({
		rootUid: params.uid,
		node: getNodeByID(params)!,
		params,
		trace: { children: [], parents: [] },
	}) as ReturnType<P['query']> & { [key in proxy]?: TBlockInfoRec[] }
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

export function ReduceQuery<P extends ReduceQuery>(params: P) {
	const proxy = ObjectValues(params.connection)[0]!.proxy

	function reduceNest(array: TBlockInfoRec[]) {
		return array.reduce((acc, crrNest) => {
			// stack the next query
			acc.push(params.query(crrNest))
			// do you have nested blocks?
			if (crrNest[proxy] && Array.isArray(crrNest[proxy])) {
				// https://stackoverflow.com/a/33921160/13914180
				acc = acc.concat(reduceNest(crrNest[proxy]!))
			}
			return acc
			// start with the query return type
		}, [] as any[])
	}
	return reduceNest(params.nested) as ReturnType<P['query']>[]
}
