import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionTypeAuthReducer, authReducer} from "./auth-reducer/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {LoginActionType, loginReducer} from "./auth-reducer/login-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    login: loginReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => ThunkDispatch<RootState, void, AppRootActionsType> = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppRootActionsType>
export type AppRootActionsType = LoginActionType | ActionTypeAuthReducer

// @ts-ignore
window.store = store;