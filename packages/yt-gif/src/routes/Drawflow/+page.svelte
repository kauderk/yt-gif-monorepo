<script>
	import Graph from '$cmp/drawflow/Graph.svelte'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Tour from '$cmp/drawflow/cmp/views/toolbar/Tour.svelte'
	import SvelteQueryProvider from '$lib/api/svelte-query/SvelteQueryProvider.svelte'
</script>

<SvelteToast />

<SvelteQueryProvider condition={true}>
	<Graph />
	<slot />
</SvelteQueryProvider>

<Tour />
