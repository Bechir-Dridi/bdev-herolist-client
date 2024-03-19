"use client"
import { useState, useEffect } from "react";
//firebase:
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function useAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [user, setUser] = useState(null)

    function signup(email, password) {
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("cred:", cred.user);

                //add role:
                const DocRef = doc(db, "users", cred.user.uid)//(db, collectionName,docID)
                setDoc(DocRef, { role: "USER" }); //(docRef, obj to add)
            })
            .then(() => {
                console.log(email, " account created")
                setError(null)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("error:", err.message);
                setError(err.message)
                setIsLoading(false)
            })
    }


    function logout() {

        signOut(auth)
            .then(() => {
                console.log("you are logged out");
            })
            .catch((err) => { console.log("error:", err.message); })
    }


    function login(email, password) {
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("cred:", cred.user);
            })
            .then(() => {
                console.log(email, " logged in")
                setError(null)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("error:", err.message);
                setError(err.message)
                setIsLoading(false)
            })
    }


    function userStatus() {

        const unsubAuth = onAuthStateChanged(auth, async (user) => {

            console.log("user status changed: ", user);

            if (user) {
                const docRef = doc(db, "users", user.uid);

                const singleDocument = await getDoc(docRef);
                console.log("doc doc: ", singleDocument);

                setUser({ email: user.email, role: singleDocument.data().role, id: singleDocument.id })
            }
            else {
                setUser(null)
            }
        })

        return () => {
            unsubAuth();
        };

    }
    useEffect(() => {
        //unsubscribe to Auth:
        userStatus()
    }, [])

    console.log("user in useAuth:", user);


    return {
        signup, login, logout,
        user,
        isLoading, error
    }

}
