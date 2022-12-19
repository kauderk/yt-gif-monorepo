<script>
	import Menu from './Menu.svelte'
	import { setContext } from './store'

	setContext()
</script>

<div>
	<Menu />
</div>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet" />
</svelte:head>
