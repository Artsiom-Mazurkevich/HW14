import {profileAPI} from "../../api/API";
import {AppDispatch} from "../store";

export type ProfileStateType = {
    profile: ProfileType
    isAuth: boolean
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
    error?: string
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
        error: '',
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
