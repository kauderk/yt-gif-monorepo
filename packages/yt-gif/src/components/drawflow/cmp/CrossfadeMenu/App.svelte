<script>
	import Menu from './Menu.svelte'
	import { setContext } from './store'

	setContext()
</script>

<div class="menu">
	<Menu />
</div>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet" />
</svelte:head>

<style>
	.menu {
		max-width: 500px;
		height: 100%;
		margin: 0;
	}
</style>
