<script>
	import {
		themeStore,
		useDmmVars,
		UpdateCssVars,
		useDdmVars,
	} from '$v3/App/Footer/ThemeStore'
	import { onMount } from 'svelte'
	import Graph from './components/Graph.svelte'

	onMount(() => {
		themeStore.useLocalStorage()
		useDmmVars.useLocalStorage()

		UpdateCssVars($themeStore.theme)

		useDdmVars(null, $useDmmVars)
	})
</script>

<Graph />

<style global>
	:root {
		--bg-shape-color: linear-gradient(120deg, #343a4f, #0f1620);
		--lightblue: #3d9dea;
		--darkblue: #4a4eee;
		--text-color: #d5e1ef;
	}
</style>
