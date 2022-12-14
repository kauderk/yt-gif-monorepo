<script lang="ts">
	import { tryGetNestedBlocks } from '$v3/lib/data/proxy/recursive'
	import Folder from './Folder.svelte'
	import type {
		DrawflowModuleData,
		DrawflowNode,
	} from '$cmp/drawflow/src/drawflow/types'
	import { createWritable } from '$lib/local-storage-store'
	import { getContext } from '../store'
	import { activate } from './store'

	export let Module = 'Home'
	export let ModuleData: DrawflowModuleData['data']

	const ctx = getContext()

	export const query = (node: DrawflowNode) => {
		const name = `${node.name} #${node.id}`
		return {
			expanded: createWritable(node.data.expanded ?? false),
			name,
			module: Module,
			id: <typeof node.id>node.id,
			actions: {
				expandSimilar() {
					activate(name)
				},
				expandAncestors() {
					activate(name)
				},
				delete() {},
				focus() {
					$ctx.editor.canvas_x = node.pos_x
					$ctx.editor.canvas_y = node.pos_y
					$ctx.editor.zoom_refresh()
				},
			},
		}
	}
	const ModuleQuery: ReturnType<typeof query> = {
		expanded: createWritable(true),
		name: Module,
		module: Module,
		id: Module,
		actions: {
			expandSimilar() {
				activate(Module)
			},
			expandAncestors() {
				activate(Module)
			},
			delete() {},
			focus() {
				$ctx.editor
					.changeModule(Module)
					.catch(() =>
						console.error('Unable to Change Module', Module)
					)
			},
		},
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
</script>

<Folder query={ModuleQuery} {children} />
