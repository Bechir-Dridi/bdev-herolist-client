"use client"
import useAuth from '@/hooks/useAuth'
import styles from './about.module.css'
import Link from 'next/link'
import Image from 'next/image'
import genos from "../../media/genos.webp"

const About = () => {
    const { user } = useAuth()

    return (
        <div className={styles.container}>
            <Image src={genos} layout="fill" objectFit="cover" alt='genos' />
            <div className={styles.content}>
                <h1> Hero List: Unmask the Morals!</h1>
                <p>
                    Welcome to Hero List, your one-stop shop for diving into the complex world of heroes and villains!
                    Here, you get to be the judge, jury, and moral compass. We'll present you with a variety of heroes and you get to decide: Hero or Villain?
                </p>

                <h1>Unleash Your Inner Critic :</h1>
                <p>
                    Like or Dislike: React to each character with a simple thumbs up "like" or thumbs down "dislike".
                    Hero or Villain? The Verdict is Yours: But the true power lies in your hands! After learning about the hero's actions and motivations,
                    decide whether they deserve the title of Hero or fall into the Villain category.
                </p>

                <h1>Why Hero List?</h1>
                <p>
                    Beyond the Cape: Heroes and villains are rarely black and white. Explore the gray areas and challenge your own perception of good and evil.
                    Hero List is more than just a like/dislike web app. It's a platform to explore the complexities of heroism, the motivations behind villains, and the power of your own moral compass.
                </p>
                {!user && <div className={styles.joinContainer}>
                    <span>
                        <p className={styles.join}>Join us today!</p>
                        <Link className={styles.btn} href="/signup"><p>Sign up</p></Link>
                    </span>
                </div>}

            </div>
        </div >

    )
}

export default About