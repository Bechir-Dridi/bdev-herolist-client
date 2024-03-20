"use client"
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/comps/loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function Signup() {
    const { signup, isLoading, error } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("text")


    //signupHandler
    const signupHandler = (e) => {
        e.preventDefault()
        signup(email, password)
        if (!error) {
            setEmail("");
            setPassword("");
        }
    }

    //change password type
    function changeType() {
        if (type === "password") { setType("text") }
        else { setType("password") }
    }

    return (
        <form className="add-container">
            <h1 style={{ textAlign: "center" }}>Signup</h1>
            <div className="add">
                <div className="inputs">
                    <label for="email">Email:</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" required />
                    <label for="password">Password:</label>
                    <div className="password-field">
                        <input className="passwordInput" onChange={e => setPassword(e.target.value)} value={password} type={type} name="password" maxLength={30} required />
                        <span className="passwordEye" onClick={changeType}>{type === "password" ? <FontAwesomeIcon size="lg" icon={faEyeSlash} /> : <FontAwesomeIcon size="lg" icon={faEye} />}</span>
                    </div>
                </div>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <button className="update-hero-btn" onClick={signupHandler}>
                {isLoading ? <Loading loadingOnBtn={true} /> : <p>Signup</p>}
            </button>
        </form >
    )
}