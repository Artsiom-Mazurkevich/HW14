import {Dispatch} from "redux";
import {registerAPI} from "../../api/API";


type InitialStateType = {
    email: string
    password: string
    isRegistred: boolean

}



const initialState: InitialStateType = {
    email: '',
    password: '',
    isRegistred: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REGISTER": {
            return {...state, email: action.payload.email, password: action.payload.password}
        }
        default: {
            return state
        }
    }
}



type ActionType = ReturnType<typeof registerAC>
const registerAC = (email: string, password: string) => ({type: 'REGISTER', payload: {email, password}} as const)


export const registerTC = () => (dispatch: Dispatch) => {

}