import { writable as svelteWritable, get } from 'svelte/store'
import type { DeepPartial } from './types/utilities'
import { recursiveAssign } from './utils/object'

// User/JWT-related
// https://stackoverflow.com/a/61300826/2933427
export const createWritableStore = <T>(key: string, startValue: T) => {
	const writable = createWritable(startValue)
	return {
		...writable,
		/**
		 * Update writable store from local storage, but don't subscribe to it
		 */
		touchLocalStorage() {
			let json = localStorage.getItem(key)!
			if (json) {
				try {
					json = JSON.parse(json)
				} catch (e) {}
				this.set(json as T)
			}
		},
		/**
		 * Once the client side component has loaded, this will retrieve the local storage key
		 * @returns Storage Unsubscriber (Function), useful to prevent memory leaks
		 */
		useLocalStorage() {
			this.touchLocalStorage()

			return this.subscribe(current => {
				localStorage.setItem(key, JSON.stringify(current))
			})
		},
	}
}

export function createWritable<T>(startValue: T) {
	const store = svelteWritable(startValue)

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
		setPartial<O extends T & object>(partial: Partial<O>) {
			const newValue = recursiveAssign<O>(read(), partial)
			store.set(newValue)
		},
		setFrom(previousHandler: (value: T) => T) {
			write(previousHandler(read()))
		},
		get: read,
	}
}
