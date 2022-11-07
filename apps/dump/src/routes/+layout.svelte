<script lang="ts">
	import '../app.css'

	import { navigating } from '$app/stores'
	import navState from '@cmp/UX/loader/store'
	import NavLoader from '@cmp/UX/loader/index.svelte'

	// if we're navigating, set the store accordingly
	$: $navState = $navigating != null ? 'loading' : 'loaded'
</script>

<NavLoader />

<slot />
