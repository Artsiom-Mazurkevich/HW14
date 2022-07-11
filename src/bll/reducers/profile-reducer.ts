import {profileAPI} from "../../api/API";
import {ThunkType} from "../store";
import {setIsAuthAC} from "./login-reducer";
import userPhoto from '../../assets/images/user.png'

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
    avatar: string
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
    error: string
}

const initialState: ProfilePayloadType = {
        id: '',
        email: '',
        name: '',
        avatar: '',
}

export type ProfileActionTypes = setProfileActionType | changeProfileDataActionType

export const profileReducer = (state: ProfilePayloadType = initialState, action: ProfileActionTypes): ProfilePayloadType => {
    switch (action.type) {
        case 'profile/SET-PROFILE': {
            return {
                ...state,
                id: action.payload.id,
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
        const updatedUser = res.data.updatedUser
        if (!updatedUser.avatar) updatedUser.avatar =`${userPhoto}`
        dispatch(setProfileAC({
            id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
        }))
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
