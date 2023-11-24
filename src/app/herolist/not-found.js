"use client"
import Link from 'next/link';

export default function NotFound() {


    return (
        <div className='not-found'>
            <h2>Not Found</h2>
            <p>Could not find the requested resource</p>
            <Link href="/herolist">Go back to All Heroes</Link>
        </div>
    );
}
