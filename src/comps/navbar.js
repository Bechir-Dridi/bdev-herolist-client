import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Image width={50} height={50} src="/logo.png" />
                <h1>Hero List</h1>
            </div>
            <Link href="/"><span>Home</span></Link>
            <Link href="/herolist"><span>Hero Listing</span></Link>
            <Link href="/about"><span>About</span></Link>
        </nav>
    )
}

export default Navbar