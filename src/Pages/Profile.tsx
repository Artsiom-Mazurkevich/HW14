import React from 'react';
import s from '../Styles/Profile.module.css'
import SuperButton from '../Components/SuperButton/SuperButton';
import {useAppSelector} from "../bll/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const isAuth = useAppSelector(state => state.login.isAuth)

    if (!isAuth) {
        return <Navigate to={"/login/"}/>
    }
    return (
        <div className={s.profilePageContainer}>
            <div className={s.contentContainer}>
                <div className={s.profileContainer}>
                    <div className={s.profileInfoContainer}>
                        <div className={s.avatarContainer}>
                            <div className={s.avatar}></div>
                        </div>
                        <div className={s.textContainer}>
                            <span className={s.name}>Ivanov Ivan</span>
                            <span className={s.description}>I`m a developer</span>
                            <div className={s.buttonContainer}>
                                <SuperButton>Edit profile</SuperButton>
                            </div>
                        </div>
                    </div>
                    <div className={s.numberOfCardsContainer}>

                    </div>
                </div>
            </div>
        </div>
    );
};

