import { createWritableStore } from '$lib/local-storage-store'
import type { TView } from '../types'
export let state = createWritableStore<TView>('views', 'left-sidebar')

export const openCloseSidebar = () => {
	const [view, setView] = state.effect()

	setView(view() == 'left-sidebar' ? 'full-graph' : 'left-sidebar')
}
