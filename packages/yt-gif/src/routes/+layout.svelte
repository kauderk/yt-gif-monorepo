<script lang="ts">
	import {
		themeStore,
		useDmmVars,
		// UpdateCssVars,
		useDdmVars,
	} from '$v3/App/Footer/ThemeStore'
	import { useDB } from '$stores/firebase'
	import { onMount } from 'svelte'

	onMount(() => {
		themeStore.useLocalStorage()
		useDmmVars.useLocalStorage()

		//UpdateCssVars($themeStore.theme)

		useDdmVars(null, $useDmmVars)

		useDB()
	})
</script>

<slot />

<style global lang="scss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	@import '../styles/open-props.scss';

	// tailwind|milkdown counter measurements
	.milkdown img {
		display: inline;
	}
</style>
