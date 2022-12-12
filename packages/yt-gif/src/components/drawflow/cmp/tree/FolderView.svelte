<script lang="ts">
	import { getNestedBlocks } from '$v3/lib/data/proxy/recursive'

	import Folder from './Folder.svelte'
	import { getContext } from '../store'
	import type { DrawflowNode } from '$cmp/drawflow/src/drawflow/types'
	import { createWritable } from '$lib/local-storage-store'

	const ctx = getContext()

	export const query = (node: DrawflowNode) => {
		return {
			expanded: createWritable(node.data.expanded ?? false),
			name: `${node.name} #${node.id}`,
		}
	}
	export const children = Object.entries(
		$ctx.editor.drawflow.drawflow.Home.data
	).map(([uid, node]) => {
		const connection = <const>{ outputs: { proxy: 'children' } }

		const nest = getNestedBlocks({
			uid,
			connection,
			walk: 'flat',
			query,
		})

		return nest
	})
	const home: ReturnType<typeof query> = {
		expanded: createWritable(true),
		name: 'Home',
	}
</script>

<Folder query={home} {children} />
