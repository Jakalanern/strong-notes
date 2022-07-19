import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfysNiX7uAXZjZE_SvJT44MBcWzTdGJdE',
  authDomain: 'fitness-tracker-e98dd.firebaseapp.com',
  projectId: 'fitness-tracker-e98dd',
  storageBucket: 'fitness-tracker-e98dd.appspot.com',
  messagingSenderId: '291603335810',
  appId: '1:291603335810:web:17239727c24ba63b9e829b',
  measurementId: 'G-9N3TX2Q7MZ',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
