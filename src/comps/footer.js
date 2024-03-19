"use client"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    { faLinkedin }

    return (
        <footer>
            <p className='copyright'>Copyright © {new Date().getFullYear()} Bdev. All Rights Reserved.</p>
            <div className='links-container'>
                <p >Developed by:</p>
                <p>
                    <Link href='https://bechirdev.netlify.app' target="_blank" rel="noreferrer">bechirdev.netlify.app</Link >
                </p>
                <Link href="https://twitter.com/bechir7dridi" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='icon' size="2xl" icon={faSquareTwitter} style={{ color: "#d9d7d3" }} />
                </Link >
                <Link href='https://www.linkedin.com/in/bechir-dev' target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='icon' size="2xl" icon={faLinkedin} style={{ color: "#d9d7d3" }} />
                </Link>
            </div>
        </footer >
    )
}

export default Footer