<script>
	import Menu from './Menu.svelte'
	import { setContext } from './store'

	const items = [
		{ id: 1, icon: 'home', title: 'To they four in love' },
		{ id: 2, icon: 'info', title: 'Concluded resembled suspected his resources curiosity joy' },
		{ id: 3, icon: 'chat', title: 'Led all cottage met enabled attempt through talking delight' },
		{ id: 4, icon: 'call', title: 'Dare he feet my tell busy' },
		{ id: 5, icon: 'security', title: 'Considered imprudence of he friendship boisterous' },
		{ id: 6, icon: 'favorite', title: 'Am of mr friendly by strongly peculiar juvenile' },
		{ id: 7, icon: 'restaurant', title: 'Goodness doubtful material has denoting suitable she two' },
		{ id: 8, icon: 'tag_faces', title: 'He otherwise me incommode explained so in remaining' },
		{ id: 9, icon: 'lock', title: 'Polite barton in it warmly do county length an' }
	]

	setContext(items)
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
