"use client"
import { colRef } from '@/firebase'
//firebase:
import { db } from '@/firebase'
import {
    onSnapshot, addDoc, deleteDoc, doc,
    query, where, orderBy, serverTimestamp,
    updateDoc,
    getDoc
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadBytes, uploadString, setString } from "firebase/storage";
import { storage } from "@/firebase";
import { useState } from 'react'
import useAuth from '@/hooks/useAuth';


export default function useHero() {
    const [isLoading, setIsLoading] = useState(false)
    const [heroMain, setHeroMain] = useState(null)
    const { user } = useAuth()


    //--------------------------------CREATE HERO
    async function createHero(formData) {
        setIsLoading(true);

        try {
            //const response = await fetch(`http://localhost:4000/api/heroes`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes`, {
                method: 'POST',
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.id}`
                },
                body: formData,
            });

            if (!response.ok) {
                console.log('Network response was not ok');
                setIsLoading(false);
            }
            const json = await response.json();
            if (response.ok) {
                const addedHero = json;
                console.log("the new added hero:", addedHero)
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Error adding new Hero:', error);
        }
    }

    //--------------------------------GET DESCRIPTION
    async function getDescription(id) {
        setIsLoading(true);
        let heroDesc = null;

        try {
            //const response = await fetch(`http://localhost:4000/api/descriptions/${id}`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/descriptions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer GvHSwmVVRCT3qYUgvef7NMWehwi2`
                },
            });

            if (!response.ok) {
                console.log('Network response was not ok');
                setIsLoading(false);
            }

            if (response.ok) {
                const json = await response.json();
                heroDesc = json.the_description;
                console.log("hero Description:", heroDesc);
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Failed to fetch hero description:", error);
        }

        return heroDesc;
    }

    //--------------------------------GET DOC - onSnapshot
    function getHeroSnap(id) {
        //setIsLoading(true)
        const SingleDocRef = doc(db, "heroes", id)//(db, collectionName,docID)

        const unsubDoc = onSnapshot(SingleDocRef, async (snapShot) => {

            if (!snapShot) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
            }

            const heroData = { ...snapShot.data() }
            const desc = await getDescription(id)

            setHeroMain({ ...heroData, id: snapShot.id, txt: desc });
            //setHeroMain({ ...heroData, id: snapShot.id });

            //setIsLoading(false)
        })

        return () => {
            unsubDoc();
            //setIsLoading(false)
        };
    }


    //--------------------------------GET DOC - getDoc
    // async function getHero(id) {

    //     const docRef = doc(db, "heroes", id);

    //     const docSnap = await getDoc(docRef)
    //     //const heroDataDoc = { ...docSnap.data(), id: docSnap.id, img: "" }
    //     const heroDataDoc = { ...docSnap.data(), id: docSnap.id }

    //     return heroDataDoc;
    // }


    //--------------------------------DEL DOC
    async function delHero(id) {
        setIsLoading(true)

        //del Hero:
        //const responseToDel = await fetch(`http://localhost:4000/api/heroes/${id}`, {
        const responseToDel = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.id}`
            },
        });

        const json = await responseToDel.json();
        if (responseToDel.ok) {
            const deletedHero = json;
            console.log("the deleted hero:", deletedHero)

            setIsLoading(false)
        }
    }

    //updateHandler
    const updateHero = async (id, formData) => {
        setIsLoading(true);

        try {
            //const response = await fetch(`http://localhost:4000/api/heroes/${id}`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}`, {
                method: 'PUT',
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.id}`
                },
                body: formData,
            });

            if (!response.ok) {
                console.log('Network response was not ok');
                setIsLoading(false);
            }

            const json = await response.json();
            if (response.ok) {
                const updatedHero = json;
                console.log("the updated hero:", updatedHero)

                setIsLoading(false);
            }



        } catch (error) {
            console.error('Error updating Hero:', error);
            setIsLoading(false);
        }
    }

    //--------------------------------UPDATE DOC - LIKE
    // async function likeFunc(id, like) {
    //     try {
    //         const response = await fetch(`http://localhost:4000/api/heroes/${id}/like`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.id}`
    //             },
    //             body: JSON.stringify(like),
    //         });

    //         const json = await response.json();
    //         if (response.ok) {
    //             const updatedHero = json;
    //             console.log("the new hero:", updatedHero)

    //         }
    //     } catch (error) {
    //         console.error('Error fetch to like:', error);
    //     }

    // }


    //--------------------------------UPDATE DOC - LIKE
    async function likeFunc(id) {
        try {
            //const response = await fetch(`http://localhost:4000/api/heroes/${id}/like`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({ email: user.email }),
            });

            const json = await response.json();
            if (response.ok) {
                const updatedHero = json;
                console.log("the liked hero:", updatedHero)

            }
        } catch (error) {
            console.error('Error fetch to like:', error);
        }

    }

    //--------------------------------UPDATE DOC - DISLIKE
    async function dislikeFunc(id) {
        try {
            //const response = await fetch(`http://localhost:4000/api/heroes/${id}/dislike`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}/dislike`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({ email: user.email }),
            });

            const json = await response.json();
            if (response.ok) {
                const updatedHero = json;
                console.log("the disliked hero:", updatedHero)

            }
        } catch (error) {
            console.error('Error fetch to dislike:', error);
        }

    }


    //--------------------------------UPDATE DOC - ISHERO
    async function isHeroFunc(id) {
        try {
            //const response = await fetch(`http://localhost:4000/api/heroes/${id}/hero`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}/hero`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({ email: user.email }),
            });

            const json = await response.json();
            if (response.ok) {
                const updatedHero = json;
                console.log("the hero chosen as a hero:", updatedHero)

            }
        } catch (error) {
            console.error('Error fetch to decide a hero -> hero:', error);
        }

    }


    //--------------------------------UPDATE DOC - ISVILLAIN
    async function isVillainFunc(id) {
        try {
            //const response = await fetch(`http://localhost:4000/api/heroes/${id}/villain`, {
            const response = await fetch(`https://herolist-server.onrender.com/api/heroes/${id}/villain`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({ email: user.email }),
            });

            const json = await response.json();
            if (response.ok) {
                const updatedHero = json;
                console.log("the hero chosen as a villain:", updatedHero)

            }
        } catch (error) {
            console.error('Error fetch to decide a hero -> villain:', error);
        }

    }

    return {
        createHero,
        heroMain, getHeroSnap, getDescription,
        delHero,
        updateHero,
        likeFunc, dislikeFunc, isHeroFunc, isVillainFunc,
        isLoading,

    }

}
