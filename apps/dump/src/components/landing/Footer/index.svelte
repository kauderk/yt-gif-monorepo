<script>
	import Brand from '$cmp/graphics/svg/Brand.svelte'
	import List from './List.svelte'

	const lists = [
		{
			title: 'Our Apps',
			routes: [
				{
					title: 'yt-gif-graph',
					href: 'https://yt-gif-graph.netlify.app/',
				},
				{
					title: 'Documentation',
					href: 'https://yt-gif-graph-docs.netlify.app/',
				},
				{
					title: 'Components',
					href: 'https://yt-gif-graph-comonents.netlify.app/',
				},
				{
					title: 'Static Site',
					href: 'https://yt-gif-graph-static.netlify.app/',
				},
			],
		},
		{
			title: 'Source Code',
			routes: [
				{
					title: 'yt-gif-monorepo',
					href: 'https://github.com/kauderk/yt-gif-monorepo',
				},
				{
					title: 'yt-gif-extension',
					href: 'https://github.com/kauderk/kauderk.github.io/tree/main/yt-gif-extension/install',
				},
			],
		},
		{
			title: 'Social Media',
			routes: [
				{
					title: 'YouTube',
					href: 'https://www.youtube.com/channel/UCkmeoqFlcEW99EdjK7H5ekw',
				},
				{
					title: 'Twitter',
					href: 'https://twitter.com/kauDerk_',
				},
			],
		},
	]
	import { theme } from '$cmp/theme/store'
</script>

<!--Footer-->
<footer class="bg-white dark:bg-black">
	<div class="container mx-auto px-8">
		<div class="w-full flex flex-col md:flex-row py-6">
			<div class="flex-1 mb-6 ">
				<Brand duration={0} contrast={$theme != 'dark'} />
			</div>
			{#each lists as config}
				<List {config} />
			{/each}
		</div>
	</div>
</footer>
