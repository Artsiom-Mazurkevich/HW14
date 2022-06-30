import {profileAPI} from "../../api/API";
import {AppDispatch} from "../store";

export type ProfileStateType = {
    profile: ProfileType
    isAuth: boolean
}

export type ResponseUpdateUser = {
    token: string
    tokenDeathTime: number
    updatedUser: {
        avatar?: string
        created: Date
        email: string
        isAdmin: false
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        token: string
        tokenDeathTime: number
        updated: Date
        verified: boolean
        __v: number
        _id: string
    }
}

export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: number,
    __v: number,
}

const initialState: ProfileStateType = {
    profile: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        __v: 0,
    },
    isAuth: false
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        default: {
            return state
        }
    }
}


type ActionType = ReturnType<typeof setProfileAC>

export const setProfileAC = (profile: ProfileType) => ({type: 'SET-PROFILE', profile} as const);

export const setProfileTC = () => (dispatch: AppDispatch) => {
    profileAPI.getProfile()
        .then(response => {
            dispatch(setProfileAC(response.data))
        })
}
export const updateProfileTC = (name: string, avatar: string) => (dispatch: AppDispatch) => {
    profileAPI.updateProfile(name, avatar)
        .then(response => {
            dispatch(setProfileAC(response.data.updatedUser))
        })
}
