import { writable, get } from 'svelte/store'

// User/JWT-related
// https://stackoverflow.com/a/61300826/2933427
export const createWritableStore = <T>(key: string, startValue: T) => {
	const store = writable(startValue)

	const read = () => get(store)
	const write = (newValue: T) => store.set(newValue)

	return {
		...store,
		/**
		 * Convenient way to get the store's getter and setter
		 * @returns [read, write]
		 */
		effect: (): [typeof read, typeof write] => [read, write],
		reset: () => write(startValue),
		get: read,
		/**
		 * Once the client side component has loaded, this will retrieve the local storage key
		 * @returns Storage Unsubscriber (Function), useful to prevent memory leaks
		 */
		useLocalStorage: () => {
			const json = localStorage.getItem(key)
			if (json) {
				write(JSON.parse(json))
			}

			return store.subscribe(current => {
				localStorage.setItem(key, JSON.stringify(current))
			})
		},
	}
}
