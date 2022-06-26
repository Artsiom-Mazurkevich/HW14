import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import {authReducer} from "./auth-reducer/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare));

//export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch



//export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;