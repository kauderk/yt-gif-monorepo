import type {
	ConnectionTypes,
	DrawflowNode,
	ID,
} from '$cmp/drawflow/src/drawflow/types'
import type { Nest, Params, Payload, Proxy } from './types'
import { ObjectKeys } from '$lib/utils'
import { DrawflowStore as ctx } from '$cmp/drawflow/cmp/store'
import { get } from 'svelte/store'

export function getConnectionIterator<N extends Nest>(step: N) {
	return ObjectKeys(step.params.connection).map(connection => {
		const branch: Proxy[] | (Proxy | undefined)[][] = []
		const rows = getConnectionRow(step.node, connection)
		const key = step.params.connection[connection]?.proxy!
		return { rows, branch, key }
	})
}

type ModuleParams = Pick<Params, 'module' | 'uid'>
export function tryGetNodeByID(params: ModuleParams): DrawflowNode | undefined {
	const node = tryGetStoreNode(params)
	if (!node) {
		console.error(
			`Failed to find node #${params.uid} at module ${params.module}`
		)
	}

	try {
		// @ts-ignore
		return (
			Object.values(tryGetDrawflowData() ?? [])
				.map(m => Object.values(m.data))

				// @ts-ignore
				.flat(Infinity)
				// @ts-ignore
				.find(o => o.id == params.uid)
		)
	} catch (error) {
		console.error(`Failed to find node #${params.uid} on any module`)
	}
}
export function tryGetStoreNode(
	params: ModuleParams
): DrawflowNode | undefined {
	return tryGetDrawflowData()?.[params.module]?.data?.[params.uid]
}

function tryGetDrawflowData() {
	return get(ctx).editor.drawflow?.drawflow
}

export function getConnectionRow(
	node: DrawflowNode,
	channel: keyof Params['connection']
): Payload[][] {
	return (
		Object.entries(node?.[channel]).map(([outlet, row]) =>
			row.connections.map(
				(o: ConnectionTypes): Payload => ({
					plug: {
						uid: o.node,
						// @ts-ignore
						connection: o.output ?? o.input,
					},
					outlet: {
						uid: node.id.toString(),
						connection: outlet,
					},
				})
			)
		) ?? []
	)
}
