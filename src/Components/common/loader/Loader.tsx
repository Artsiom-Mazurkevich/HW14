import React from "react";
import {CircularProgress} from "@mui/material";
import style from "./Loader.module.css"


export const Loader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <CircularProgress size={100}/>
            </div>
        </div>
    );
};