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

	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Tour from '$cmp/drawflow/cmp/views/toolbar/Tour.svelte'
	import '../app.css'
	import '../styles/open-props.scss'
</script>

<SvelteToast />

<slot />
<Tour />
