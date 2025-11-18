// Firebase initialization for Auth and Realtime Database (anonymous sign-in)
// Uses provided configuration
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyC2DogNLie7OzFKurCTZY_YwIc9U-O3CY4',
  databaseURL: 'https://gamexzone-vn97h-default-rtdb.asia-southeast1.firebasedatabase.app'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)

export const ensureAuth = () =>
  new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsub()
        resolve(user)
      } else {
        try {
          const cred = await signInAnonymously(auth)
          unsub()
          resolve(cred.user)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
