<script lang="ts" context="module">
	import dataToImport from '$cmp/drawflow/data.json'
	import type { TFile } from './File.svelte'
	import { getNestedBlocks } from '$v3/lib/data/proxy/recursive'
	import { writable } from 'svelte/store'

	const children = Object.entries(dataToImport.drawflow.Home.data).map(
		([uid, node]) => {
			const connection = <const>{ outputs: { proxy: 'children' } }

			const nest = getNestedBlocks({
				uid,
				connection,
				walk: 'flat',
				// @ts-ignore
				query(node, payload) {
					return {
						expanded: writable(node.data.expanded ?? false),
						name: `${node.name} #${node.id}`,
					}
				},
			})

			return <const>{
				...nest,
			}
		}
	)
	const home = writable(true)
</script>

<script lang="ts">
	import Folder from './Folder.svelte'
</script>

<Folder name="Home" {children} expanded={home} />
