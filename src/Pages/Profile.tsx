import React, {ChangeEvent, useEffect, useState} from 'react';
import s from '../Styles/Profile.module.css'
import {ProfileStateType, setProfileTC, updateProfileTC} from "../redux/auth-reducer/profile-reducer";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import { TextField } from '@mui/material';

export type NewProfileDataType = {
    name: string,
    avatar: string,
}

export const Profile = () => {
    useEffect(() => {
        dispatch(setProfileTC())
    });
    const dispatch = useAppDispatch();
    const profile = useSelector<RootState, ProfileStateType>(state => state.profile);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(profile.profile.name);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const disActivateEditMode = () => {
        setEditMode(false);
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    };
    const updateProfileData = (name: string, avatar: string) => {
        dispatch(updateProfileTC(name, avatar));
        setEditMode(false);
    };

    return !editMode
    ? <div className={s.profilePageContainer}>
            <div className={s.profileContainer}>
                <div className={s.profileInfoContainer}>
                        <div className={s.avatar}></div>
                        <span className={s.name}>{profile.profile.name}</span>
                        <button className={s.btn} onClick={activateEditMode}>Edit profile</button>
                </div>
                <div className={s.numberCardsContainer}>
                    <span className={s.text}>Number of cards</span>
                </div>
            </div>
        </div>
    : <div className={s.editProfilePageContainer}>
            <div className={s.avatar}></div>
            <TextField id="standard-helperText" label="Edit your name" defaultValue={profile.profile.name} variant="standard" onChange={changeTitle} />
            <TextField id="standard-helperText" label="Email" defaultValue={profile.profile.email} variant="standard" disabled/>
            <div className={s.buttonContainer}>
                <button className={s.cancelBtn} onClick={disActivateEditMode}>Cancel</button>
                <button className={s.editBtn} onClick={() => updateProfileData(newName, '')}>Save</button>
            </div>
    </div>
};

