import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'
import type { Nest, Params, Proxy } from './types'
import data from '$cmp/drawflow/data.json'
import { ObjectKeys } from '$lib/utils'

export function getConnections(step: Nest) {
	return ObjectKeys(step.params.connection).map(c =>
		createConnectionLookup(step, c)
	)
}
function createConnectionLookup(step: Nest, connection: 'inputs' | 'outputs') {
	const branch = Array<Proxy>()
	const rows = getConnectionRow(step.node, connection)
	const key = step.params.connection[connection]?.proxy!
	return { rows, branch, key }
}

export function getNodeByID({
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
