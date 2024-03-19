"use client"
import { useEffect, useState } from "react";
import Image from "next/image"
import "../app/globals.css"
import useHero from "@/hooks/useHero";
import useAuth from "@/hooks/useAuth";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";

function UpdateHero({ id, heroMain, toggle, setToggle }) {
    //const { update } = useFetch()
    const { updateHero, isLoading } = useHero()
    const { loadingBtn } = Loading()
    const { user } = useAuth()

    const [name, setName] = useState(heroMain?.name || "")
    const [from, setFrom] = useState(heroMain?.from || "")

    const [text, setText] = useState(heroMain?.txt || "")
    const [img, setImg] = useState(heroMain?.imgUrl) // Initially null


    //updateHandler
    const updateHandler = async (e) => {
        e.preventDefault()
        if (name === "" || from === "" || text === "") return

        const formData = new FormData();
        formData.append('name', name);
        formData.append('from', from);
        formData.append('text', text);
        formData.append('img', img);

        updateHero(heroMain?.id, formData)

        setName("")
        setFrom("")
        setText("")
    }

    //toggle img to update:
    const [preview, setPreview] = useState(true);
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
            setPreview(false)
        } else {
            setPreview(true)
        }
    };

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
                {preview && <Image width={170} height={170} src={img} alt="hero-img" />}
                <input type="file" onChange={(e) => handleFileChange(e)} />
            </div>

            <button className="update-hero-btn" onClick={updateHandler}>
                {isLoading ? <Loading loadingOnBtn={true} /> : <p>Update hero</p>}
            </button>

        </form >
    )
}
export { UpdateHero }