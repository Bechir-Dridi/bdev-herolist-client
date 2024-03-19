"use client"
import styles from "./herolist.module.css"
import { AddHero } from '@/comps/addHero'
import useHeroes from "@/hooks/useHeroes"
import { useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useHero from "@/hooks/useHero"
import Loading from "@/comps/loading"
import HeroDetails from "@/comps/heroDetails"
import { toast } from "sonner"


export default function HeroList() {
  const { getHeroes, heroes, isLoading } = useHeroes()
  const { delHero, likeFunc, dislikeFunc, isHeroFunc, isVillainFunc } = useHero()
  const { user } = useAuth()
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const fetchHeroes = () => {
      switch (filter) {
        case "likeHero": getHeroes("hero", "likeSum"); break;
        case "dislikeHero": getHeroes("hero", "dislikeSum"); break;
        case "likeVillain": getHeroes("villain", "likeSum"); break;
        case "dislikeVillain": getHeroes("villain", "dislikeSum"); break;
        case "All": getHeroes("all", "createdAt"); break;
        default: getHeroes("all", "createdAt");
      }
    };

    fetchHeroes();
  }, [filter]);


  const delHandler = async (id) => {
    console.log("id: ", id);
    //del Hero:
    delHero(id)
  }


  //let myLike = null; let myDislike = null; let myHero = null; let myVillain = null;
  const likeHandler = async (id) => {
    try {
      if (!user) {
        toast.error(`Please log in to like this hero!`);
        //console.log("Please log in to like this hero!")
        return
      }

      // switch (clicked) {
      //   case "liked": myLike = true; break;
      //   case "disliked": myDislike = true; break;
      //   case "heroTrue": myHero = true; break;
      //   case "villainTrue": myVillain = true; break;

      //   default: break;
      // }

      //const like = { email: user.email, myLike, myDislike, myHero, myVillain }
      likeFunc(id)

      //myLike = null; myDislike = null; myHero = null; myVillain = null
      console.log("id: ", id);
      console.log("user_id: ", user);

    } catch (error) {
      console.error('Error updating likeHandler:', error);
    }
  }

  const dislikeHandler = async (id) => {
    try {
      if (!user) {
        toast.error(`Please log in to dislike this hero!`);
        //console.log("Please log in to like this hero!")
        return
      }

      dislikeFunc(id)

    } catch (error) {
      console.error('Error updating dislikeHandler:', error);
    }
  }

  const isHeroHandler = async (id) => {
    try {
      if (!user) {
        toast.error(`Please log in to confirm this is a hero!`);
        //console.log("Please log in to like this hero!")
        return
      }

      isHeroFunc(id)

    } catch (error) {
      console.error('Error updating isHeroHandler:', error);
    }
  }

  const isVillainHandler = async (id) => {
    try {
      if (!user) {
        toast.error(`Please log in to confirm this is a villain!`);
        //console.log("Please log in to like this hero!")
        return
      }

      isVillainFunc(id)

    } catch (error) {
      console.error('Error updating isVillainHandler:', error);
    }
  }

  return (
    <div className={styles.container}>

      <div className={styles.titleFilterContainer}>
        <h1 className={styles.title}>Heroes</h1>

        <select name="heroesFilter" id={styles.heroesFilter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="likeHero">Most Liked Heroes</option>
          <option value="dislikeHero">Most Hated Heroes</option>
          <option value="likeVillain">Most Liked Villains</option>
          <option value="dislikeVillain">Most Hated Villains</option>
        </select>
      </div>

      {user?.role === "ADMIN" && <>
        <AddHero user={user} />
      </>}

      {isLoading && <p>Loading...</p>}
      {isLoading && <Loading loadingOnBtn={false} />}

      <div className={styles.cardContainer}>
        {!isLoading && heroes && heroes.map((hero) =>

          <HeroDetails hero={hero}
            likeHandler={likeHandler}
            dislikeHandler={dislikeHandler}
            delHandler={delHandler}
            isHeroHandler={isHeroHandler}
            isVillainHandler={isVillainHandler}
            user={user} />

        )
        }
      </div>

    </div >
  )
}
