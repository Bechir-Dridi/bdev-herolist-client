import styles from './herolist.module.css'
import Link from 'next/link'


export const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function HeroList() {
  const data = await getData()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Heroes</h1>

      {data.map(hero =>
        <div key={hero.id}>
          <Link href={`/herolist/` + hero.id}>
            <div className={styles.hero}>
              <h3 >{hero.name}</h3>
            </div>
          </Link>

        </div>
      )
      }
    </div >
  )
}
