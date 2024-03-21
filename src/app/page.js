// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.netlify.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import all_might from "../media/all_might.webp"
import endeavor from "../media/endeavor.webp"
import saitama from "../media/saitama.webp"
import silver_fang from "../media/silver_fang.webp"
import garo from "../media/garo.webp"

export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.slidesContainer}>
        <Image width={300} height={300} src={all_might} alt='all_might' />
        <Image width={300} height={300} src={endeavor} alt='endeavor' />
        <Image width={300} height={300} src={saitama} alt='saitama' />
        <Image width={300} height={300} src={silver_fang} alt='silver_fang' />
      </div>

      <div className={styles.herolistDescription}>
        <p className={styles.text}>
          Welcome to our Heroes website! Here, you can explore a gallery of heroes from various sources.
          For each hero, you have the power to like or dislike them based on your opinion.
          But that's not all! You can also categorize these heroes as true heroes or villains.
          This website is all about fostering critical thinking and exploring the concepts of heroism and villainy.
          Immerse yourself in this interactive experience and let your voice be heard!
        </p>
        <Image className={styles.descImg} width={300} height={300} src={garo} alt='garo' />
      </div>
      <Link className={styles.btn} href="/herolist"><p>See Hero Listing</p></Link>
    </div>
  )
}
