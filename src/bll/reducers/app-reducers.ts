import {ThunkType} from "../store";
import {authApi} from "../../api/API";
import {loginAC} from "./login-reducer";

export type LoadingStatusType = "idle" | "loading" | "successful" | "failed"

type InitialStateType = {
    error: string | null
    loadingStatus: LoadingStatusType
    isInitialized: boolean
}
const initialState: InitialStateType = {
    error: null,
    loadingStatus: "idle",
    isInitialized: false,
}

export type AppActionType =
    ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setError>

export const appReducers = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "app/SET-LOADING-STATUS":
            return {...state, loadingStatus: action.loadingStatus}
        case "app/SET-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        case "app/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setLoadingStatus = (loadingStatus: LoadingStatusType) => {
    return {
        type: "app/SET-LOADING-STATUS",
        loadingStatus
    } as const
}
export const setInitialized = (isInitialized: boolean) => {
    return {
        type: "app/SET-INITIALIZED",
        isInitialized
    } as const
}

export const setError = (error: string | null) => {
    return {
        type: "app/SET-ERROR",
        error
    } as const
}

export const authMeTC = ():ThunkType => async dispatch => {
        dispatch(setLoadingStatus("loading"))
    try{
        const response = await authApi.authMe()
        dispatch(setInitialized(true))
        dispatch(setLoadingStatus('successful'))
    }catch (e:any){
        const error = e.response.data ? e.response.data.error : ('error');
        // const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setLoadingStatus('failed'))
        // dispatch(setError(error))
    }finally {
        dispatch(setLoadingStatus('idle'))
    }
}


