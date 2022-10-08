<script lang="ts">
	import Navbar from '$lib/PageComponents/Navbar.svelte'

	let dark: boolean = true

	import { page } from '$app/stores'
	$: path = $page.url.pathname.split('/')[1]
</script>

<div class:dark>
	<Navbar {dark} />
	<div id="page" class="mt-20 mb-40">
		<slot />
	</div>
</div>

<svelte:head>
	<link
		href="https://unpkg.com/open-props/normalize.min.css"
		rel="stylesheet" />
	{#if path.includes('example')}
		<link href="https://unpkg.com/open-props" rel="stylesheet" />
		<style>
			body {
				display: grid;
				place-content: center;
			}
		</style>
	{/if}
</svelte:head>

<style lang="scss">
	@import '../app.css';
	:root {
		--link-visited: var(--orange-5);
	}
</style>
