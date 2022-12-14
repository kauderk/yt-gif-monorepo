<script lang="ts">
	import { tryGetNestedBlocks } from '$v3/lib/data/proxy/recursive'

	import Folder from './Folder.svelte'
	import type {
		DrawflowModuleData,
		DrawflowNode,
	} from '$cmp/drawflow/src/drawflow/types'
	import { createWritable } from '$lib/local-storage-store'

	export let Module = 'Home'
	export let ModuleData: DrawflowModuleData['data']
	export const query = (node: DrawflowNode) => {
		return {
			expanded: createWritable(node.data.expanded ?? false),
			name: `${node.name} #${node.id}`,
			module: Module,
			id: <typeof node.id>node.id,
		}
	}
	export const children = Object.entries(ModuleData).map(([uid]) => {
		const connection = <const>{ outputs: { proxy: 'children' } }

		const nest = tryGetNestedBlocks({
			module: Module,
			uid,
			connection,
			walk: 'flat',
			query,
		})!

		return nest
	})
	const ModuleQuery: ReturnType<typeof query> = {
		expanded: createWritable(true),
		name: Module,
		module: Module,
		id: Module,
	}
</script>

<Folder query={ModuleQuery} {children} />
