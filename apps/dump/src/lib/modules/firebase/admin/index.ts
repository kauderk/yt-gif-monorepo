import admin from 'firebase-admin'
import { getApp, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getStorage, Storage } from 'firebase-admin/storage'

export let app: App
export let auth: Auth
export let storage: Storage

import dotenv from 'dotenv'
dotenv.config()
import {
	PRIVATE_FIREBASE_ADMIN_PROJECT_ID,
	PRIVATE_FIREBASE_ADMIN_CLIENT_EMAIL,
	PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY,
	PRIVATE_FIREBASE_ADMIN_STORAGE_BUCKET,
} from '$env/static/private'

if (!getApps().length) {
	app = initializeApp({
		credential: admin.credential.cert({
			projectId: PRIVATE_FIREBASE_ADMIN_PROJECT_ID,
			clientEmail: PRIVATE_FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY,
		}),
		storageBucket: PRIVATE_FIREBASE_ADMIN_STORAGE_BUCKET,
	})
} else {
	app = getApp()
}

auth = getAuth(app)
storage = getStorage(app)
