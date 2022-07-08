import {profileAPI} from "../../api/API";
import {ThunkType} from "../store";
import {setIsAuthAC} from "./login-reducer";

export type ResponseUpdateUser = {
    updatedUser: ProfileStateType,
    error?: string
}

export type LogoutResponse = {
    info: string
    error: string
}

export type ProfilePayloadType = {
    id: string
    email: string
    name: string
    avatar: string
}

export type ProfileStateType = {
    avatar?: string
    created: string
    email: string
    isAdmin: false
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

const initialState: ProfileStateType = {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        __v: 0,
}

export type ProfileActionTypes = setProfileActionType | changeProfileDataActionType

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionTypes): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET-PROFILE': {
            return {
                ...state,
                _id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                avatar: action.payload.avatar
            }
        }
        case 'profile/CHANGE-PROFILE': {
            return {...state, ...action.data}
        }
        default: {
            return state
        }
    }
}


export const setProfileAC = (payload: ProfilePayloadType) => ({type: 'profile/SET-PROFILE', payload} as const)
type setProfileActionType = ReturnType<typeof setProfileAC>

export const changeProfileDataAC = (data: ProfileStateType) => ({type: 'profile/CHANGE-PROFILE', data} as const)
type changeProfileDataActionType = ReturnType<typeof changeProfileDataAC>

export const updateProfileTC = (name: string, avatar: string):ThunkType => async dispatch => {
    try {
        const res = await profileAPI.updateProfile(name, avatar)
        dispatch(changeProfileDataAC(res.data.updatedUser))
    }
    catch (e) {
        console.log(e)
    }
}
export const logoutTC = ():ThunkType => async dispatch => {
    try {
        const res = await profileAPI.logout()
        if (res.data.info) {
            dispatch(setProfileAC({
                id: '',
                email: '',
                name: '',
                avatar: '',
            }))
            dispatch(setIsAuthAC(false))
        }
    }
    catch (e) {
        console.log(e)
    }
}
