import {registerAPI} from "../../api/API";
import {AppDispatch} from "../store";


type InitialStateType = {
    email: string
    isRegistred: boolean

}


const initialState: InitialStateType = {
    email: '',
    isRegistred: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REGISTER": {
            return {
                ...state,
                email: action.payload.email,
                isRegistred: action.payload.isRegistred
            }
        }
        default: {
            return state
        }
    }
}


type ActionType = ReturnType<typeof registerAC>
const registerAC = (email: string, isRegistred: boolean) => ({
    type: 'REGISTER',
    payload: {email, isRegistred}
} as const)


export const registerTC = (email: string, password: string) => (dispatch: AppDispatch) => {
    registerAPI.register(email, password)
        .then(response => {
           dispatch(registerAC(response.data.addedUser.email, true))
        })
        .catch(response => console.log(response.response.data.error))
}
