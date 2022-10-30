import { writable } from 'svelte/store'

export const windowExist = writable(false)
export const useWindow = (cb: Function) => {
	let unsub = () => {}
	unsub = windowExist.subscribe(v => {
		if (v) {
			cb()
			unsub()
		}
	})
}
