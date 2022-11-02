import { firebaseUser } from '@lib/modules/firebase/client'
import type { Handle } from '@sveltejs/kit'
import { get } from 'svelte/store'

export const handle: Handle = async ({ event, resolve }) => {
	const fUser = get(firebaseUser)
	if (fUser) {
		document.cookie = `authorization=Bearer ${await fUser.getIdToken()}; Path=/;`
	} else {
		document.cookie = `authorization=; Path=/; Expires=${new Date(
			0
		).toUTCString()};`
	}

	return resolve(event)
}
