"use client"
import styles from './herolist_id.module.css'
import Image from "next/image"
import "../../globals.css";
import Link from 'next/link'
import { UpdateHero } from "@/comps/updateHero";
//import useFetch from "@/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import useHero from "@/hooks/useHero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Loading from "@/comps/loading";
import useAuth from "@/hooks/useAuth";


export default function Hero({ params }) {
    const { id } = params;
    const { heroMain, getHeroSnap, getDescription, getImg, isLoading } = useHero();
    const { user } = useAuth()
    const [toggle, setToggle] = useState(false)



    useEffect(() => {
        getHeroSnap(id);
    }, [id]);



    return (
        <div>
            <div className={styles.backBtnContainer}>
                <Link className={styles.backBtnContainer} href="/herolist">
                    <FontAwesomeIcon className={styles.backBtn} size="2xl" icon={faArrowLeftLong} />
                </Link>
            </div>

            {isLoading && <Loading loadingOnBtn={false} />}
            <div className={styles.hero}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && !toggle &&
                    <div className={styles.heroDetailsContainer}>
                        <div className={styles.nameContainer}>
                            <h2>{heroMain?.name}</h2>{/* Use optional chaining to avoid errors if hero is null or undefined */}
                            <div className={styles.fromContainer}>
                                <p>{heroMain?.from}</p>
                            </div>
                        </div>

                        <div className={styles.descriptionContainer}>
                            <Image width={170} height={170} src={heroMain?.imgUrl} alt="hero-img" />
                            <div className={styles.txtContainer}>
                                <p>{heroMain?.txt}</p>
                            </div>
                        </div>
                    </div>

                }

                {user?.role === "ADMIN" && <>
                    {toggle &&
                        <div>
                            <UpdateHero id={id} heroMain={heroMain} toggle={toggle} setToggle={setToggle} />
                        </div>}

                    <div className={styles.updateBtn} onClick={() => setToggle(!toggle)}>
                        <FontAwesomeIcon size="2xl" icon={faPenToSquare} />
                    </div>
                </>}

            </div>
        </div>
    );
}