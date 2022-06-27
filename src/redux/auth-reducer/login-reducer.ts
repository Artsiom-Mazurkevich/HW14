type InitialStateType = {
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
    avatar: string
    deviceTokens: Array<DeviceTokenType>
}
type DeviceTokenType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}
const initialState: InitialStateType = {
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
}

type ActionType = ReturnType<typeof loginAC>

export const loginReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                rememberMe: action.payload.rememberMe
            }
        }
        default: {
            return state
        }
    }
}

export const loginAC = (email: string, password: string, rememberMe: boolean) => {
    return {
        type: "LOGIN",
        payload: {
            email,
            password,
            rememberMe,
        }
    }
}