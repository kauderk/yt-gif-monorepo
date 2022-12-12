<script lang="ts">
	import Folder from './Folder.svelte'
	import type { TFile } from './File.svelte'
	import dataToImport from '$cmp/drawflow/data.json'
	import { getBlockParentUids } from '$v3/lib/data/block/query'
	import { getNestedBlocks } from '$v3/lib/data/proxy/recursive'

	const children = Object.entries(dataToImport.drawflow.Home.data).map(
		([uid, node]) => {
			const nest = getNestedBlocks({
				uid,
				connection: { outputs: { proxy: 'children' } },
				walk: 'flat',
				// @ts-ignore
				query(node, payload) {
					return {
						name: `${node.name} #${node.id}`,
					}
				},
			})
			return <const>{
				...nest,
			}
		}
	)

	let root: TFile[] = [
		{
			name: 'Animal GIFs',
			expanded: true,
			children: [
				{
					name: 'Dogs',
					children: [
						{ name: 'treadmill.gif' },
						{ name: 'rope-jumping.gif' },
					],
				},
				{
					name: 'Goats',
					children: [
						{ name: 'parkour.gif' },
						{ name: 'rampage.gif' },
					],
				},
				{ name: 'cat-roomba.gif' },
				{ name: 'duck-shuffle.gif' },
				{ name: 'monkey-on-a-pig.gif' },
			],
		},
		{ name: 'TODO.md' },
		{ name: 'Readme.md' },
	]
</script>

<Folder name="Home" {children} expanded={true} />
