import {authApi} from "../../api/API";
import {ThunkType} from "../store";

export type RegistrationResponseType = {
    addedUser: {
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
    }
}

type InitialStateType = {
    email: string
    isRegistered: boolean

}


const initialState: InitialStateType = {
    email: '',
    isRegistered: false,
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionTypeAuthReducer) => {
    switch (action.type) {
        case "REGISTER": {
            return {
                ...state,
                email: action.payload.email,
                isRegistered: action.payload.isRegistered
            }
        }
        default: {
            return state
        }
    }
}


export type ActionTypeAuthReducer = ReturnType<typeof registerAC>
const registerAC = (email: string, isRegistered: boolean) => ({
    type: 'REGISTER',
    payload: {email, isRegistered: isRegistered}
} as const)


export const registerTC = (email: string, password: string):ThunkType => (dispatch) => {
    authApi.register(email, password)
        .then(response => {
           dispatch(registerAC(response.data.addedUser.email, true))
        })
        // .catch(response => console.log(response.response.data.error))
        .catch(response => alert(response.response.data.error))
}
