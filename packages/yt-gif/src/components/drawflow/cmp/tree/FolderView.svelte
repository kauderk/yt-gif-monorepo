<script lang="ts">
	import { getNestedBlocks } from '$v3/lib/data/proxy/recursive'

	import Folder from './Folder.svelte'
	import { getContext } from '../store'
	import type {
		DrawflowExport,
		DrawflowNode,
	} from '$cmp/drawflow/src/drawflow/types'
	import { createWritable } from '$lib/local-storage-store'

	const ctx = getContext()

	type modules = 'Home'
	export const query = (node: DrawflowNode) => {
		return {
			expanded: createWritable(node.data.expanded ?? false),
			name: `${node.name} #${node.id}`,
			id: <typeof node.id | modules>node.id,
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
		id: 'Home',
	}
</script>

<Folder query={home} {children} />
