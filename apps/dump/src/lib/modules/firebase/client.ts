import { initializeApp } from 'firebase/app'
import { getAnalytics, type Analytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, type User as FbUser } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import type { User } from '@prisma/client'

import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID,
} from '$env/static/public'

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export let analytics: Analytics
if (browser) {
	analytics = getAnalytics(app)
}

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const currentUser = writable<User | null>(null)
export const firebaseUser = writable<FbUser | null>(null)

auth.onAuthStateChanged(async user => {
	firebaseUser.set(user)

	if (user) {
		const res = await fetch(`/api/users/${user.uid}`)

		if (res.status === 200) {
			const dbUser = (await res.json()).user
			currentUser.set(dbUser)
			document.cookie = `authorization=Bearer ${await user.getIdToken()}; Path=/; Expires=Session;`
		}
	} else {
		currentUser.set(null)

		if (browser)
			document.cookie =
				'authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
	}
})

export const storage = getStorage(app)
