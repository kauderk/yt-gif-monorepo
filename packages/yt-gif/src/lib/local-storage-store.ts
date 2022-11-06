import { writable, get as getter } from 'svelte/store'

// User/JWT-related
// https://stackoverflow.com/a/61300826/2933427
export const createWritableStore = <T>(key: string, startValue: T) => {
	const store = writable(startValue)
	const get = () => getter(store)
	const set = (newValue: T) => store.set(newValue)

	return {
		...store,
		signal: () => [get, set],
		reset: () => set(startValue),
		get,
		useLocalStorage: () => {
			const json = localStorage.getItem(key)
			if (json) {
				set(JSON.parse(json))
			}

			return store.subscribe(current => {
				localStorage.setItem(key, JSON.stringify(current))
			})
		},
	}
}
