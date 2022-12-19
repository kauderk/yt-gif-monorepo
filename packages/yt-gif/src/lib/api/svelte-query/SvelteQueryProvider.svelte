<script>
	import { createEventDispatcher } from 'svelte'
	import {
		queryClient,
		QueryClientProvider,
	} from '../../../lib/api/svelte-query/client'
	export let condition = false
	export let async = false
	const dispatch = createEventDispatcher()
</script>

{#if condition}
	<QueryClientProvider client={queryClient}>
		<slot />
	</QueryClientProvider>
{:else if async}
	{#await import('../../../lib/api/svelte-query/client') then c}
		<svelte:component this={c.QueryClientProvider}>
			<slot />
		</svelte:component>
	{/await}
{:else}
	<slot />
{/if}
