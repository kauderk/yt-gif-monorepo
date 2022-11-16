<script>
	import Graph from '$cmp/drawflow/Graph.svelte'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Tour from '$cmp/drawflow/cmp/views/toolbar/Tour.svelte'

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
	const queryClient = new QueryClient()
</script>

<SvelteToast />

<QueryClientProvider client={queryClient}>
	<Graph />
	<slot />
</QueryClientProvider>

<Tour />
