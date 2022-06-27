import axios, {AxiosResponse} from "axios";
import {LoginResponseType} from "../redux/auth-reducer/login-reducer";


export type ResponseType = {
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

export type ErrorType = {
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    emailRegExp: {}
    passwordRegExp: string
}


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    withCredentials: true,
})


export const registerAPI = {
    register(email: string, password: string) {
        debugger
        return instance.post<{}, AxiosResponse<ResponseType>>("/auth/register", {
            email,
            password
        })
    },
}

export const loginApi = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<{}, AxiosResponse<LoginResponseType>>("/auth/login", {email, password,rememberMe})
    },
}


