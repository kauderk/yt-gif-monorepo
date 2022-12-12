<script lang="ts">
	import Folder from './Folder.svelte'
	import type { TFile } from './File.svelte'
	import dataToImport from '$cmp/drawflow/data.json'
	import { getBlockParentUids } from '$v3/lib/data/block/query'

	const files = Object.entries(dataToImport.drawflow.Home.data).map(
		([key, node]) => {
			const f = getBlockParentUids(key)
			return {
				type: 'file',
				name: `${node.name} #${node.id}`,
			}
		}
	)

	let root: TFile[] = [
		{
			type: 'folder',
			name: 'Animal GIFs',
			expanded: true,
			files: [
				{
					type: 'folder',
					name: 'Dogs',
					files: [
						{ type: 'file', name: 'treadmill.gif' },
						{ type: 'file', name: 'rope-jumping.gif' },
					],
				},
				{
					type: 'folder',
					name: 'Goats',
					files: [
						{ type: 'file', name: 'parkour.gif' },
						{ type: 'file', name: 'rampage.gif' },
					],
				},
				{ type: 'file', name: 'cat-roomba.gif' },
				{ type: 'file', name: 'duck-shuffle.gif' },
				{ type: 'file', name: 'monkey-on-a-pig.gif' },
			],
		},
		{ type: 'file', name: 'TODO.md' },
		{ type: 'file', name: 'Readme.md' },
	]
</script>

<Folder name="Home" {files} expanded={true} />
