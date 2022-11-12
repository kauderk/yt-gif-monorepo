<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
	import RootPage from '../+page.svelte'
</script>

<RootPage {data} />
