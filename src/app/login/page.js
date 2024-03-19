"use client"
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/comps/loading";

export default function Login() {
    const { login, isLoading, error } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //signupHandler
    const loginHandler = (e) => {
        e.preventDefault()
        login(email, password)
        if (!error) {
            setEmail("");
            setPassword("");
        }
    }

    return (
        <form className="add-container">
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="add">
                <div className="inputs">
                    <label for="email">Email:</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" name="email" required />
                    <label for="password">Password:</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} type="text" name="password" required />
                </div>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <button className="update-hero-btn" onClick={loginHandler}>
                {isLoading ? <Loading loadingOnBtn={true} /> : <p>Login</p>}
            </button>

        </form >
    )
}