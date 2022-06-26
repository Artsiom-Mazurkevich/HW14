import React from 'react';
import {Navigation} from "../Navigation";
import s from "./Header.module.css"

export const Header = () => {
    return (
        <header className={s.header}>
            <Navigation/>
        </header>
    );
};

