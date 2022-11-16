import { createWritableStore } from '$lib/local-storage-store'
import type { TView, states } from '../types'
export let state = createWritableStore<TView>('views', {
	active: '',
	previous: '',
})

export const toggleActiveView = (to: states) => {
	return () => {
		const [view, setView] = state.effect()

		setView(
			view().active == to
				? { ...view(), active: '' }
				: { ...view(), active: to }
		)
	}
}
