import { createWritableStore } from '$lib/local-storage-store'
import type { TView } from '../types'

export const viewStore = createWritableStore<TView>('view', 'left-sidebar')
