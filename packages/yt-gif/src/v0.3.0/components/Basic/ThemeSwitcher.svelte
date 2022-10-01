<script>
	import themeStore from 'svelte-themes'
	$: if ($themeStore.theme == 'dark') console.log('hello')
</script>

{#if $themeStore.theme == 'dark'}
	<link
		rel="stylesheet"
		type="text/css"
		id="RoamThemes"
		href="http://127.0.0.1:5500/src/styles/railscast-roam.css" />
{/if}
