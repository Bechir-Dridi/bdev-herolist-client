"use client"
import Image from "next/image"
import "../app/globals.css";
import Link from 'next/link'
import { UpdateHero } from "@/comps/updateHero";
import { useEffect, useRef, useState } from "react";
import useHero from "@/hooks/useHero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


export default function Loading(props) {
    const { loadingOnBtn } = props || {};

    return (
        <div className={!loadingOnBtn ? "loading-on-screen-container" : null}>
            <div className={loadingOnBtn ? "loading-container" : "loading-on-screen"}>
                <div className="loading">
                    <FontAwesomeIcon size="2xl" icon={faSpinner} style={{ color: "#ffffff" }} />
                </div>
            </div>
        </div>
    );
}