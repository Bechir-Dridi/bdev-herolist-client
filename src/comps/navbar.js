"use client"
import Link from "next/link"
import Image from "next/image"
import useAuth from "@/hooks/useAuth"

const Navbar = () => {
    const { user, logout } = useAuth()

    //console.log("user in navbar:", user.email);


    const logoutHandler = (e) => {
        e.preventDefault()
        logout()
    }
    return (
        <nav>
            <div className="sign">

                {user?.email && <>
                    <p>{user?.email}</p>
                    <a onClick={logoutHandler}>Logout</a>
                </>}

                {!user?.email && <>
                    <Link href="/login">Login</Link>
                </>}

                <Link href="/signup">Signup</Link>

            </div>

            <div className="navbar">
                <div className="logo">
                    <Image width={50} height={50} src="/logo.png" />
                    <h1>Hero List</h1>
                </div>

                <Link href="/"><span>Home</span></Link>
                <Link href="/herolist"><span>Hero Listing</span></Link>
                <Link href="/about"><span>About</span></Link>
            </div>
        </nav>
    )
}

export default Navbar