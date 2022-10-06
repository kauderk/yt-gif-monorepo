<script>
	import {
		themeStore,
		useDmmVars,
		UpdateCssVars,
		useDdmVars,
	} from '$v3/App/Footer/ThemeStore'
	import { onMount } from 'svelte'
	import Graph from './components/drawflow/Graph.svelte'

	onMount(() => {
		themeStore.useLocalStorage()
		useDmmVars.useLocalStorage()

		UpdateCssVars($themeStore.theme)

		useDdmVars(null, $useDmmVars)
	})
</script>

<Graph />

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"
		integrity="sha256-KzZiKy0DWYsnwMF+X1DvQngQ2/FxF7MF3Ff72XcpuPs="
		crossorigin="anonymous"></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
		integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
		crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
		rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="https://unpkg.com/micromodal/dist/micromodal.min.js"></script>
</svelte:head>

<style global lang="scss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@import './open-props.scss';
	@import './components/drawflow/styles/beautiful.css';
	/* https://jerosoler.github.io/drawflow-theme-generator/ */
	@import './components/drawflow/styles/min.css';
	@import './components/drawflow/styles/gray.css';
	/* https://github.com/p34eu/selectables */
	@import './components/drawflow/plugins/selectables/index.css';

	html,
	body,
	#app {
		height: 100%;
		width: 100%;
		margin: 0;
	}
	.wrapper {
		background: var(--surface3);
	}
</style>
