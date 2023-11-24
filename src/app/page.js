// import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Homepage</h1>
      <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et laborum optio reiciendis incidunt? Perspiciatis voluptates natus unde molestiae consectetur voluptatum nemo, quod officiis ipsam maxime repellat sunt sint exercitationem. Voluptatibus.</p>
      <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et laborum optio reiciendis incidunt? Perspiciatis voluptates natus unde molestiae consectetur voluptatum nemo, quod officiis ipsam maxime repellat sunt sint exercitationem. Voluptatibus.</p>
      <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et laborum optio reiciendis incidunt? Perspiciatis voluptates natus unde molestiae consectetur voluptatum nemo, quod officiis ipsam maxime repellat sunt sint exercitationem. Voluptatibus.</p>
      <Link className={styles.btn} href="/herolist"><p>See Hero Listing</p></Link>
    </div>
  )
}
