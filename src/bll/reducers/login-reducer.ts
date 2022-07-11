import {ThunkType} from "../store";
import {authApi} from "../../api/API";
import {setError, setLoadingStatus} from "./app-reducers";
import {setProfileAC} from "./profile-reducer";

export type LoginStateType = {
    data: LoginType
    isAuth: boolean
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type LoginType = {
    _id: string
    email: string
    name: string
    password: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

const initialState: LoginStateType = {
    data: {
        _id: "",
        email: "",
        name: "",
        password: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: "",
    },
    isAuth: false
}

export type LoginActionType = ReturnType<typeof setIsAuthAC>

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'Login/ISAUTH': {
            return {
                ...state, isAuth: action.payload.isAuth,
            }
        }
        default: {
            return state
        }
    }
}

/*export const loginAC = (data: ProfileStateType, isAuth: boolean) => {
    return {
        type: "login/GET-USER",
        payload: {
            data,
            isAuth
        }
    } as const
}*/

export const setIsAuthAC = (isAuth: boolean) => ({type: 'Login/ISAUTH', payload: { isAuth }} as const);

export const loginTC = (values: LoginParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus("loading"))
        const res = await authApi.login(values);
        const user = res.data.data;
        dispatch(setIsAuthAC(true))
        dispatch(setProfileAC({
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        }))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : ('error');
        console.log(error)
        dispatch(setError(error))
    }
}

