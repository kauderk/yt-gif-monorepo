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

	import NavLoader, { navState } from '$cmp/stand-alone/NavLoader.svelte'
	import { navigating } from '$app/stores'
	// if we're navigating, set the store accordingly
	$: $navState = $navigating != null ? 'loading' : 'loaded'

	import '../app.css'
	import '../styles/open-props.scss'
</script>

<NavLoader />

<slot />
