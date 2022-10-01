import { createEventDispatcher } from 'svelte'
export function Top() {
	const dispatch = createEventDispatcher()
	let focused = false
	let closed: b = false
	let opened = false

	const setOpen = (hover: b) => {
		opened = hover
		dispatch('open', hover)
	}
	const setFocus = (hover: b) => {
		if (!closed) {
			focused = hover
		}
		dispatch('focus', hover)
	}

	return {
		focused,
		opened,
		closed,

		setFocus,
		setOpen,
	}
}
