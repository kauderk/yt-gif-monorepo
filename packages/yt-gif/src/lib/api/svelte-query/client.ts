export { QueryClientProvider } from '@sveltestack/svelte-query'
import { QueryClient } from '@sveltestack/svelte-query'
export const queryClient = new QueryClient()

/**
 * https://stackoverflow.com/a/71322653/13914180
 */
export const stealthQuery = {
	refetchOnWindowFocus: false,
	enabled: false,
}
