import type { RequireAtLeastOne, RequireOnlyOne } from '$lib/types/utilities'
import { ObjectKeys, ObjectValues } from '$lib/utils'
import { getNodeByID, getConnectionIterator, getConnectionRow } from './data'
import type { ReduceQuery, Nest, Params, getTypeofProxy } from './types'

export function getNestedBlocks<P extends Params>(params: P) {
	type proxy = ReturnType<typeof getTypeofProxy<P>>

	const node = getNodeByID(params)!

	type Recursive<T> = T & {
		[key in proxy]?: Recursive<T>[]
	}

	return REC({
		rootUid: params.uid,
		node,
		params,
		trace: { children: [], parents: [] },
		//FIXME: these types could turn rogue
	}) as ReturnType<P['query']> &
		(P['walk'] extends 'flat'
			? { [key in proxy]?: Recursive<ReturnType<P['query']>>[] }
			: {
					[key in proxy]: (
						| Recursive<ReturnType<P['query']>>
						| undefined
					)[]
			  })
}

function REC(step: Nest) {
	const connectionIterator = getConnectionIterator(step)

	for (const iterator of connectionIterator) {
		/**
		 * blocks can have multiple outputs
		 */
		for (const row of iterator.rows) {
			const connections = createConnectionRowArrayByReference(
				iterator,
				row,
				step
			)

			/**
			 * map the uid to a valid node
			 * then trace it to avoid stack overflows
			 * then walk down the children hierarchy
			 */
			for (const payload of row) {
				const { uid } = payload.plug
				const nextNode = getNodeByID({ ...step.params, uid })
				const canWalkDown =
					!step.trace[iterator.key].includes(uid) &&
					step.rootUid != uid

				// once you are in, block the way for your possible self
				if (nextNode && canWalkDown) {
					// track potential recursive nodes
					step.trace[iterator.key].push(uid)

					const rec = REC({ ...step, payload, node: nextNode })

					// release them so others can check for themselves
					step.trace[iterator.key].pop()

					connections.push(rec)
				}
				// you found your self, show the properties but not the children
				else if (nextNode && !canWalkDown) {
					connections.push(step.params.query(nextNode, payload))
				}
			}
		}
	}

	return {
		...step.params.query(step.node, step.payload),
		...connectionIterator.reduce((acc, crr) => {
			if (crr.branch?.length) {
				return {
					...acc,
					[crr.key]: crr.branch,
				}
			} else {
				return acc
			}
		}, {}),
	}
}

function createConnectionRowArrayByReference<
	I extends ReturnType<typeof getConnectionIterator>[number]
>(iterator: I, row: I['rows'][number], step: Nest) {
	if (step.params.walk == 'flat')
		return iterator.branch as Partial<TBlockInfoRec>[]

	const index = iterator.rows.indexOf(row)

	/**
	 * Since a single outlet/plug can have multiple connections
	 * create a fresh connection array for each row
	 */
	const connections = (iterator.branch[Number(index)] ??= []) as Partial<
		TBlockInfoRec | undefined
	>[]

	/**
	 * respect the block outlet/plug order
	 * if the current row is empty, make it explicit
	 */
	if (!row.length) {
		connections.push(undefined)
	}
	return connections
}

export function ReduceQuery<P extends ReduceQuery>(params: P) {
	const proxy = ObjectValues(params.connection)[0]!.proxy

	function reduceNest(parentObj: Partial<TBlockInfoRec>) {
		return parentObj.parents?.reduce((acc, crrNest) => {
			// stack the next query
			acc.push(params.query(crrNest, parentObj))
			// do you have nested blocks?
			if (crrNest[proxy] && Array.isArray(crrNest[proxy])) {
				// https://stackoverflow.com/a/33921160/13914180
				acc = acc.concat(reduceNest(crrNest))
			}
			return acc
			// start with an array
		}, [] as any[]) as ReturnType<P['query']>[]
	}

	const array = reduceNest(params.nest!)
	// add yourself to the beginning
	// @ts-ignore
	array?.unshift(params.query(params.nest))

	return array as ReturnType<P['query']>[]
}
