type StatusType = 'idle' | 'loading' | 'successes' | 'failed'


export type InitialStateType = {
    loadingStatusAPP: StatusType
    error: string | null
    isInitialized: boolean
}


const initialState: InitialStateType = {
    loadingStatusAPP: 'idle',
    error: null,
    isInitialized: false,
}


export type AppActionType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>


export const setAppErrorAC = (error: string | null) => ({
    type: "APP/SET-ERROR",
    error
} as const)
export const setAppStatusAC = (status: StatusType) => ({
    type: "APP/SET-STATUS",
    status
} as const)
export const setAppInitializedAC = (value: boolean) => ({
    type: "APP/SET-IS-INITIALIZED",
    value
} as const)


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, loadingStatusAPP: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":{
            return {...state, isInitialized:action.value}
        }
        default:
            return state
    }
}


