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
<Alerter />
<div class="flex flex-col justify-between h-full">
	<Header />

	<main class="grow shrink-0 overflow-auto">
		<slot />
	</main>

	<Footer url={data.url} />
</div>

<style>
</style>
