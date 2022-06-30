import React from 'react';
import {NavLink} from "react-router-dom";
import s from '../Styles/Navigation.module.css';
import {PATH} from "../enum/path";


export const Navigation = () => {
    return (
        <nav className={s.nav}>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.PROFILE}>profile</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.REGISTRATION}>registration</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.LOGIN}>login</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.TEST}>test</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.RECOVERY}>recovery</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to={PATH.FORGOT}>forgot</NavLink>
            {/*<NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="error">error</NavLink>*/}
        </nav>
    );
};

