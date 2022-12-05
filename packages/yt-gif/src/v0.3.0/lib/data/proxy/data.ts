import type {
	ConnectionTypes,
	DrawflowNode,
} from '$cmp/drawflow/src/drawflow/types'
import type { Nest, Params, Payload, Proxy } from './types'
import data from '$cmp/drawflow/data.json'
import { ObjectKeys } from '$lib/utils'

export function getConnectionIterator<N extends Nest>(step: N) {
	return ObjectKeys(step.params.connection).map(connection => {
		const branch: Proxy[] | (Proxy | undefined)[][] = []
		const rows = getConnectionRow(step.node, connection)
		const key = step.params.connection[connection]?.proxy!
		return { rows, branch, key }
	})
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
