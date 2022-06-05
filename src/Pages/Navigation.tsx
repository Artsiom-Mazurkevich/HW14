import React from 'react';
import {NavLink} from "react-router-dom";
import s from '../Styles/Navigation.module.css';

export const Navigation = () => {
    return (
        <nav className={s.nav}>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="profile">profile</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="registration">registration</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="login">login</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="test">test</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="error">error</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="recovery">recovery</NavLink>
            <NavLink className={({ isActive }) =>(isActive ? s.active : "")} to="forgot">forgot</NavLink>
        </nav>
    );
};

