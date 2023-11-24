// export async function generateStaticParams() {
//     const heroes = await fetch('https://jsonplaceholder.typicode.com/users')
//         .then((res) => res.json())

//     const paths = heroes.map((hero) => ({
//         params: { id: hero.id }

//     }))

//     return { paths }
// }


export default async function Hero({ params }) {
    const id = params.id
    //console.log("myId: ", id);
    const hero = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch Hero details data')
            return res.json()
        })
    return (
        <div>
            <h1>Hero Details</h1>
            <h2> {hero.name}</h2>
            <p> {hero.email}</p>
            <p> {hero.website}</p>
            <p> {hero.address.city}</p>
        </div>
    )
}