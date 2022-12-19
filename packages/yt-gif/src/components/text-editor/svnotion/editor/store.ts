import { createWritableStore } from '$lib/local-storage-store'

export const moduleStore = createWritableStore('moduleStore', {
	showExtraUI: false,
})
