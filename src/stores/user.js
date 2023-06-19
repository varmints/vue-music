import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      console.log('userCred', userCred)

      await setDoc(doc(usersCollection, userCred.user.uid), {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })
      // await usersCollection.doc(userCred.user.uid).set({
      //   name: values.name,
      //   email: values.email,
      //   age: values.age,
      //   country: values.country
      // })

      await updateProfile(userCred.user, {
        displayName: values.name
      })

      // await userCred.user.updateProfile({
      //   displayName: values.name
      // })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },
    async signOut() {
      await signOut(auth)

      this.userLoggedIn = false
    }
  }
})
