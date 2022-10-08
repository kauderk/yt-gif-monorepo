import { derived } from 'svelte/store'
import { page } from '$app/stores'

export const active = derived(page, $page => (href: string) => {
	const path = $page.url.pathname.split('/')[2]
	return path === href || (!href && !path)
})
