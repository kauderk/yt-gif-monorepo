<script lang="ts">
	import {
		themeStore,
		useDmmVars,
		UpdateCssVars,
		useDdmVars,
	} from '$v3/App/Footer/ThemeStore'
	import { onMount } from 'svelte'

	onMount(() => {
		themeStore.useLocalStorage()
		useDmmVars.useLocalStorage()

		UpdateCssVars($themeStore.theme)

		useDdmVars(null, $useDmmVars)
	})
</script>

<slot />

<style global lang="scss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
