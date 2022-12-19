import { getMenu } from '$lib/routes/server-pagination'

export const load = getMenu(import.meta.glob('./*/+page.svelte'))
