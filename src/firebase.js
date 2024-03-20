import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import { getAuth } from "firebase/auth"



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

//initialize the connection to firebase backend:
initializeApp(firebaseConfig)

//--- init services ---
export const db = getFirestore()
//set collection ref
export const colRef = collection(db, "heroes") //(db, collectionName)

//init auth service:
export const auth = getAuth()

//init storage:
export const storage = getStorage()