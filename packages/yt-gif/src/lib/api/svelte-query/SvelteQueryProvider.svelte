<script>
	import {
		queryClient,
		QueryClientProvider,
	} from '$lib/api/svelte-query/client'
	export let condition = false
</script>

{#if condition}
	<QueryClientProvider client={queryClient}>
		<slot />
	</QueryClientProvider>
{:else}
	<slot />
{/if}
