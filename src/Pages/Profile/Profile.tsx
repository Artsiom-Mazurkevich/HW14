import React, {ChangeEvent, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {logoutTC, updateProfileTC} from "../../bll/reducers/profile-reducer";
import {TextField} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import userPhoto from '../../assets/images/user.png'
import {authMeTC} from "../../bll/reducers/app-reducers";

export const Profile = React.memo(() => {
    // const isAuth = useAppSelector(state => state.login.isAuth);
    const profile = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();

    const avatar = profile.avatar ? profile.avatar : userPhoto;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(profile.name);
    const [newAvatar, setNewAvatar] = useState<string>(avatar);

    // useEffect(() => {
    //     dispatch(authMeTC())
    // }, [dispatch, isAuth])

    const activateEditMode = () => {
        setEditMode(true);
    };
    const disActivateEditMode = () => {
        setEditMode(false);
    };
    const avatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                setNewAvatar(URL.createObjectURL(e.target.files[0]));
            }
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    };
    const updateProfileData = (name: string, avatar: string) => {
        dispatch(updateProfileTC(name, avatar));
        setEditMode(false);
    };

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    // if (!isAuth) {
    //     return <Navigate to={"/login"}/>
    // }

    return !editMode
        ? <div className={s.profilePageContainer}>
            <div className={s.profileContainer}>
                <div className={s.profileInfoContainer}>
                    <div className={s.logoutBtnContainer}>
                        <div className={s.logoutContainer}>
                            <button type='button' className={s.logoutBtn} onClick={logoutHandler} id='logoutBtn'/>
                            <label htmlFor='logoutBtn' className={s.labelLogout}>
                                <LogoutIcon/>
                            </label>
                        </div>
                    </div>
                    <img src={avatar != null ? avatar : userPhoto}
                         className={s.avatar}
                         alt='avatar'/>
                    <span className={s.name}>{profile.name}</span>
                    <button className={s.btn} onClick={activateEditMode}>Edit profile</button>
                </div>
                <div className={s.numberCardsContainer}>
                    <span className={s.text}>Number of cards</span>
                </div>
            </div>
        </div>
        : <div className={s.editProfilePageContainer}>
            <span className={s.editTitle}>Personal Information</span>
            <div className={s.editContentContainer}>
                <div className={s.editAvatarContainer}>
                    <img src={newAvatar != null ? newAvatar : userPhoto}
                         className={s.avatar}
                         alt='avatar'
                    />
                    <div className={s.editAvatarBtnContainer}>
                        <div className={s.editAvatarBtn}>
                            <input type='file' accept='image/jpeg,image/png' onChange={avatarSelected}
                                   className={s.inputFile}
                                   id='inputFile'/>
                            <label htmlFor='inputFile' className={s.labelInput}>
                                <PhotoCameraOutlinedIcon/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={s.editInputsContainer}>
                    <TextField id="standard-helperText" label="Edit your name" defaultValue={profile.name}
                               variant="standard" onChange={changeTitle}/>
                    <TextField id="standard-helperText" label="Email" defaultValue={profile.email}
                               variant="standard" disabled/>
                </div>
                <div className={s.editButtonsContainer}>
                    <button className={s.editCancelBtn} onClick={disActivateEditMode}>Cancel</button>
                    <button className={s.editSaveBtn}
                            onClick={() => updateProfileData(newName, '')}>Save
                    </button>
                </div>
            </div>
        </div>
})

