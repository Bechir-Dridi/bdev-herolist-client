"use client"
import { colRef } from '@/firebase'
//firebase:
import { db, storage } from '@/firebase'
import {
    onSnapshot, addDoc, deleteDoc, doc,
    query, where, orderBy, serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { useState, useEffect } from 'react'
import useAuth from '@/hooks/useAuth'


export default function useHeroes() {
    const [isLoading, setIsLoading] = useState(false)
    const [heroes, setHeroes] = useState(null)
    const [descriptions, setDescriptions] = useState({});
    const { user } = useAuth()

    //--------------------------------GET ALL DESCRIPTIONS 
    useEffect(() => {
        const fetchDescriptions = async () => {
            const descriptionsData = {};
            for (const hero of heroes) {
                try {
                    const response = await fetch(`https://herolist-server.onrender.com/api/descriptions/${hero.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.id}`
                        }
                    });
                    const json = await response.json();
                    if (response.ok) {
                        descriptionsData[hero.id] = json.the_description;
                    }
                } catch (error) {
                    console.error('Error fetching description:', error);
                }
            }
            setDescriptions(descriptionsData);
        };

        if (heroes && heroes.length > 0) {
            fetchDescriptions();
        }
    }, [heroes]);



    //--------------------------------GET ALL DOCS 
    async function getHeroes(isHero, sum) {
        setIsLoading(true)

        //query:
        const q = query(colRef,
            orderBy(sum, "desc"))
        // where("from", "==", "Boku No Hero Academia"),
        //orderBy("createdAt", "desc"))

        //get collection data:
        const unsubCol = onSnapshot(q, (snapShot) => {
            //const myDocs = snapShot.docs //all documents
            //console.log("myDocs: ", myDocs);

            if (!snapShot.docs) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
            }

            let heroes = []
            snapShot.docs.map(async (doc) => {
                //heroes.push({ ...doc.data(), id: doc.id })
                heroes = [...heroes, { ...doc.data(), id: doc.id }]
            })

            let filteredHeroes = []
            if (isHero === "hero") {
                filteredHeroes = heroes.filter(hero => hero.villainSum < hero.heroSum)
            }
            else if (isHero === "villain") {
                filteredHeroes = heroes.filter(hero => hero.villainSum >= hero.heroSum)
            }
            else {
                filteredHeroes = heroes
            }
            setHeroes(filteredHeroes)
            setIsLoading(false)
        })

        return () => {
            unsubCol();
            setIsLoading(false)
        };
    }

    return {
        getHeroes, heroes,
        descriptions,
        isLoading
    }

}
