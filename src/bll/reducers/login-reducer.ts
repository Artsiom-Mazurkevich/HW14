import {ThunkType} from "../store";
import {authApi, ErrorType} from "../../api/API";
import {setError, setLoadingStatus} from "./app-reducers";
import {AxiosError} from "axios";

type LoginStateType = {
    data: LoginResponseType
    isAuth: boolean
}

export type LoginResponseType = {
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
}

const initialState: LoginStateType = {
    data: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ""
    },
    isAuth: false
}

export type LoginActionType = ReturnType<typeof loginAC>

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case "login/GET-USER": {
            return {
                ...state,
                data: action.payload.data,
                isAuth: action.payload.isAuth
            }
        }
        default: {
            return state
        }
    }
}

export const loginAC = (data: LoginResponseType, isAuth: boolean) => {
    return {
        type: "login/GET-USER",
        payload: {
            data,
            isAuth
        }
    } as const
}

export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    dispatch(setLoadingStatus("loading"))
    try {
        const response = await authApi.login(email, password, rememberMe)
        dispatch(loginAC(response.data, true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : ('error');
        console.log(error)
        dispatch(setError(error))
    } finally {
        dispatch(setLoadingStatus("idle"))
    }
}

