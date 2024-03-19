"use client"
import Image from "next/image"

import Link from 'next/link'
import useHeroes from "@/hooks/useHeroes"
import { useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import useHero from "@/hooks/useHero"
import Card from "@/comps/shared/card"
import villainIcon from "@/media/villain.svg"
import heroIcon from "@/media/hero.svg"
import likeIcon from "@/media/like.svg"
import dislikeIcon from "@/media/dislike.svg"
import bin from "@/media/bin.svg"
import Loading from "@/comps/loading"

export default function HeroDetails({ hero, likeHandler, dislikeHandler, isHeroHandler, isVillainHandler, delHandler, user }) {

    return (
        <Card key={hero.id}>
            <Link href={`/herolist/` + hero.id}>

                <div>
                    <div className={`cardTitle ${(hero.villainSum >= hero.heroSum) ? "cardTitleForVillain" : "cardTitleForHero"}`}>
                        <Image width={30} height={30} src={hero.villainSum >= hero.heroSum ? villainIcon : heroIcon} alt="villain-icon" title={hero.villainSum >= hero.heroSum ? "Villain" : "Hero"} />
                        <h3 className="heroName">{hero.name}</h3>
                    </div>
                    <h4 className="heroFrom">{hero.from}</h4>
                </div>

                <div className="imgContainer">
                    <Image width={170} height={170} src={hero.imgUrl} alt="hero-img" />
                </div>

            </Link>

            {user?.role === "ADMIN" && <>
                <button onClick={() => delHandler(hero.id, hero.imgName, hero.name)}>
                    <Image width={24} height={24} src={bin} alt="del-img" />
                </button>
            </>}

            <div className="evalContainer">

                <div className="btnContainer">

                    <div className="btn-eval">
                        <button onClick={() => likeHandler(hero.id)}>
                            <Image width={20} height={20} src={likeIcon} alt="like-icon" /> {hero.likeSum !== 0 && <span>{hero.likeSum}</span>}
                        </button>
                    </div>

                    <div className="btn-eval">
                        <button onClick={() => dislikeHandler(hero.id)}>
                            <Image width={20} height={20} src={dislikeIcon} alt="dislike-icon" /> {hero.dislikeSum !== 0 && <span>{hero.dislikeSum}</span>}
                        </button>
                    </div>
                </div>

                <div className="btnContainer">

                    <div className="btn-eval" title="Hero">
                        <button onClick={() => isHeroHandler(hero.id)}>
                            <Image width={20} height={20} src={heroIcon} alt="hero-icon" />{hero.heroSum !== 0 && <span>{hero.heroSum}</span>}
                        </button>
                    </div>

                    <div className="btn-eval" title="Villain" >
                        <button onClick={() => isVillainHandler(hero.id)}>
                            <Image width={20} height={20} src={villainIcon} alt="villain-icon" />{hero.villainSum !== 0 && <span>{hero.villainSum}</span>}
                        </button>
                    </div>

                </div>

            </div>
        </Card>
    )
}