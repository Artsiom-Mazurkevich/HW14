import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {emptyReducer} from "./emptyReducer";
import thunkMiddleWare from "redux-thunk";


const rootReducer = combineReducers({
    empty: emptyReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare));

//export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;