<script lang="ts">
	import Folder from './Folder.svelte'

	let root = [
		{
			type: 'folder',
			name: 'Animal GIFs',
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

<Folder name="Home" files={root} expanded />