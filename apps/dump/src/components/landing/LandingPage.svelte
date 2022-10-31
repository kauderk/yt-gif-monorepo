<script lang="ts">
	import Nav from './Nav.svelte'
	import Hero from './Hero.svelte'
	import Features from './Features.svelte'
	// import Cards from './Cards.svelte'
	// import Pricing from './Pricing.svelte'
	// import CallToAction from './CallToAction.svelte'
	import Footer from './Footer/index.svelte'
	import { theme } from '$cmp/theme/store'
</script>

<div
	class={$theme == 'dark'
		? `bg-gradient-to-r from-sky-700 to-indigo-700`
		: 'leading-normal tracking-normal gradient'}
	style="font-family: 'Source Sans Pro', sans-serif;">
	<Nav />

	<Hero />

	<Features />

	<!-- <Cards />

	<Pricing />

	<CallToAction /> -->

	<Footer />
</div>

<style>
	.gradient {
		@apply bg-gradient-to-r from-pink to-yellow;
	}
</style>
