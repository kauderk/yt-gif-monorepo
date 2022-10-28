import { writable } from 'svelte/store'
import type { FirebaseApp } from 'firebase/app'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { firebaseConfig } from '$lib/variables'

export let BD = writable(<FirebaseApp>{})

export const useDB = () => {
	if (!getApps().length) {
		BD.set(initializeApp(firebaseConfig))
	} else {
		BD.set(getApp())
	}
}
