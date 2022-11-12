<script>
	import Menu from './Menu.svelte'
	import { setContext } from './store'

	setContext()
</script>

<div style:--max-w="500px" style:--max-h="500px">
	<Menu />
</div>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet" />
</svelte:head>

<style>
	div {
		max-width: var(--max-w, 500px);
		aspect-ratio: 9 / 12;
		margin: 0;
	}
</style>
