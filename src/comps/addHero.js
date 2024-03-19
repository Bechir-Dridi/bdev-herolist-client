"use client"
import { useState } from "react";
import "../app/globals.css"
//import useFetch from "@/hooks/useFetch";
import useHero from "@/hooks/useHero";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import Loading from "./loading";


function AddHero({ user }) {
    const { createHero, isLoading } = useHero()

    const [name, setName] = useState("")
    const [from, setFrom] = useState("")

    const [img, setImg] = useState(null)
    const [text, setText] = useState("")


    //addHandler
    const addHandler = async (e) => {
        e.preventDefault()
        if (name === "" || from === "" || text === "") return

        const formData = new FormData();
        formData.append('name', name);
        formData.append('from', from);
        formData.append('text', text);
        formData.append('img', img);

        createHero(formData)

        setName("")
        setFrom("")
        setText("")
    }


    return (
        <form className="add-container">

            <div className="add">
                <div className="inputs">
                    <label for="name">Name:</label>
                    <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" required />
                    <label for="from">From:</label>
                    <input onChange={e => setFrom(e.target.value)} value={from} type="text" name="from" required />
                </div>
            </div>

            <div className="upload">
                <h1>upload description</h1>
                <textarea name="description" id="description" cols="30" rows="10" onChange={(e) => setText(e.target.value)} value={text} />
            </div>

            <div className="upload">
                <h1>upload img</h1>
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            </div>

            <button className="add-hero-btn" onClick={addHandler}>
                {isLoading ? <Loading loadingOnBtn={true} /> : <p >Add hero</p>}
            </button>

        </form >
    )
}
export { AddHero }