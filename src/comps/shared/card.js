import React, { useState } from "react"
//import { globalStyles } from '../styles/global';


export default function Card(props) {

    return (
        <div className="card">
            <div className="cardContent">
                {props.children}
            </div>
        </div>
    );
}

