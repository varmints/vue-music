import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
})
const storage = getStorage(app)

const usersCollection = collection(db, 'users')
const songsCollection = collection(db, 'songs')
const commentsCollection = collection(db, 'comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }
