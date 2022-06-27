import {AppDispatch, ThunkType} from "../store";
import {loginApi} from "../../api/API";

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
        error: ''
    },
    isAuth: false
}


export type LoginActionType = ReturnType<typeof loginAC>

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case "GET-USER": {
            return {...state, data: action.payload.data, isAuth: action.payload.isAuth}
        }
        default: {
            return state
        }
    }
}

export const loginAC = (data:LoginResponseType, isAuth:boolean ) => {
    return {
        type: "GET-USER",
        payload: {
            data,
            isAuth
        }
    }as const
}

export const loginTC = (email: string, password: string, rememberMe: boolean):ThunkType => async dispatch => {
    try{
        const response = await loginApi.login(email, password,rememberMe)
        dispatch(loginAC(response.data, true))
    }
    catch (e: any) {
        const error = e.response ? e.response.data.error : (`${e.message}, more details in the console`);
        console.log(error)
    }finally {

    }


}

/*type InitialStateType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar?: string
    deviceTokens: Array<DeviceTokenType>
}*/
/*type DeviceTokenType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}*/
/*const initialState: InitialStateType = {
    _id: "",
    email: "",
    rememberMe: false,
    isAdmin: false,
    name: "",
    verified: false,
    publicCardPacksCount: 0,
    created: "2020-06-19T17:38:50.679Z",
    updated: "2022-06-27T08:21:22.448Z",
    __v: 0,
    token: "",
    tokenDeathTime: 0,
    avatar: "",
    deviceTokens: [
        {
            _id: "0",
            device: "0",
            token: "0",
            tokenDeathTime: 0
        }
    ]
}*/