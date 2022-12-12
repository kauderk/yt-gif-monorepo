<script lang="ts">
	import { getNestedBlocks } from '$v3/lib/data/proxy/recursive'
	import { writable } from 'svelte/store'
	import Folder from './Folder.svelte'
	import { getContext } from '../store'

	const ctx = getContext()

	export const children = Object.entries(
		$ctx.editor.drawflow.drawflow.Home.data
	).map(([uid, node]) => {
		const connection = <const>{ outputs: { proxy: 'children' } }

		const nest = getNestedBlocks({
			uid,
			connection,
			walk: 'flat',
			query(node, payload) {
				return {
					expanded: writable(node.data.expanded ?? false),
					name: `${node.name} #${node.id}`,
				}
			},
		})

		return nest
	})
	const home = writable(true)
</script>

<Folder name="Home" {children} expanded={home} />
