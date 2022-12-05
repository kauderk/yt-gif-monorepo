import type { ID } from '$cmp/drawflow/src/drawflow/types'
import { createWritableStore } from '$lib/local-storage-store'

type Falsy<T> = null | T
// prettier-ignore
type state = 'idle'|'loading'|'created'|'reload'|'stop'|'end'|'playing'|'muted'|'paused'|'error'|'invalid'|state[]
export const createState = (id: ID) =>
	createWritableStore(id.toString(), {
		videoId: null as Falsy<s>,
		playerID: null as Falsy<s>,
		state: 'idle' as state,
	})
