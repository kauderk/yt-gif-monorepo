<script lang="ts">
	import type { LayoutServerData } from './$types'
	import Base from '$lib/Base.svelte'

	export let data: LayoutServerData

	const pages = [
		{
			title: data.preload.title,
			links: data.posts.map(p => ({
				href: p.slug.current ?? 'slug',
				text: p.title ?? 'title',
			})),
		},
	]
</script>

<Base {pages} path="/sprints">
	<slot />
</Base>
