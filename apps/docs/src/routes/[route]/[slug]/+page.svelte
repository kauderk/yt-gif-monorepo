<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import Code from '$lib/Code.svelte'
	import Link from '$lib/Link.svelte'
	import ImageBlock from '$lib/ImageBlock.svelte'
	import AuthorBlock from '$lib/AuthorBlock.svelte'
	import AuthorCard from '$lib/AuthorCard.svelte'
	import SanityImage from '$lib/SanityImage.svelte'

	import type { PageServerData } from './$types'
	export let data: PageServerData

	$: post = data.post

	import { page } from '$app/stores'
	$: path = $page.url.pathname.split('/')[1]
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<span>/{path}</span>
<h1>/{post.title}</h1>
<p>
	Published {new Date(post.publishedAt).toLocaleDateString('en', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	})}
</p>

{#each post.authors || [] as author}
	<AuthorCard {author} />
{/each}

<hr />

{#if post.image}
	<SanityImage image={post.image} />
{/if}

<PortableText
	value={post.body}
	components={{
		types: {
			code: Code,
			image: ImageBlock,
			authorReference: AuthorBlock,
		},
		marks: {
			link: Link,
		},
	}} />
