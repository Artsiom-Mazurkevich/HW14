import {combineReducers, legacy_createStore} from "redux";
import {emptyReducer} from "./emptyReducer";


const rootReducer = combineReducers({
    empty: emptyReducer,
})

export const store = legacy_createStore(rootReducer);

//export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;