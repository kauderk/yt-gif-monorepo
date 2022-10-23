import { writable, get } from 'svelte/store'

import { page } from '$app/stores'

export const history = writable(new Array<string>())

export const useHistory = () => {
	return page.subscribe(v => {
		const path = v.url.pathname.split('/').pop()
		history.update(a => [...a, path])
	})
}

export const match = (to: string) => {
	return [...get(history)].pop()?.includes(to)
}
