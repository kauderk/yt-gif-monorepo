<script lang="ts">
	import type { LayoutServerData } from './$types'
	import Base from '$lib/Base.svelte'

	export let data: LayoutServerData

	const pages = [
		{
			title: data.preload.title,
			links: data.posts.map(p => ({
				href: p.slug.current,
				text: p.title,
			})),
		},
	]
</script>

<Base {pages} path="/{data.page}">
	<slot />
</Base>
