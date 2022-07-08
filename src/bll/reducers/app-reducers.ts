import {ThunkType} from "../store";
import {authApi} from "../../api/API";
import {setProfileAC} from "./profile-reducer";
import userPhoto from '../../assets/images/user.png'

export type LoadingStatusType = "idle" | "loading"

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

export const authMeTC = ():ThunkType => async dispatch =>{
        dispatch(setLoadingStatus("loading"))
    try{
        const response = await authApi.authMe()
        const user = response.data
        if (!user.avatar) user.avatar = `${userPhoto}`
        dispatch(setProfileAC({
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
        }))
    }catch (e:any){
        const error = e.response.data ? e.response.data.error : ('more' +
            ' details in the console');
        // const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
        dispatch(setError(error))
    }finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(setInitialized(true))
    }
}