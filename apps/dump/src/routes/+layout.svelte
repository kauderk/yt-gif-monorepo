<script lang="ts">
	import { goto } from '$app/navigation'
	import Alerter from '$lib/components/Alerter.svelte'
	import Footer from '$lib/components/footer/Footer.svelte'
	import Header from '$lib/components/header/Header.svelte'
	import { auth } from '$lib/modules/firebase/client'

	import '../app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<svelte:window
	on:keydown={async e => {
		if (e.altKey && e.key == 'o') {
			document.cookie = `authorization=; Path=/; Expires=${new Date(
				0
			).toUTCString()};`
			await auth.signOut()
			goto('/')
		}
	}} />

<svelte:head>
	<link
		rel="stylesheet"
		href="https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/Graph.css" />
	<script
		src="https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/dependencies.js"
		defer></script>
	<script
		src="https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/Graph.js"
		defer></script>
</svelte:head>

<Alerter />
<div class="flex flex-col justify-between h-full">
	<Header />

	<main class="grow overflow-auto">
		<slot />
	</main>

	<Footer url={data.url} />
</div>

<style>
</style>
