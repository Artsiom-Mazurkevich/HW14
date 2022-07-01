import axios, {AxiosResponse} from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";
import {RegistrationResponseType} from "../bll/reducers/registration-reducer";
import {LoginResponseType} from "../redux/auth-reducer/login-reducer";
import {ProfileType, ResponseUpdateUser} from "../redux/auth-reducer/profile-reducer";




export type ErrorType = {
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    emailRegExp: {}
    passwordRegExp: string
}


export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    baseURL: "http://localhost:7542/2.0",
    withCredentials: true,
})


export const authApi = {
    register(email: string, password: string) {
        return instance.post<{}, AxiosResponse<RegistrationResponseType>>("/auth/register", {
            email,
            password
        })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<{}, AxiosResponse<LoginResponseType>>("/auth/login", {email, password,rememberMe})
    },
    authMe(){
        return instance.post<{}, AxiosResponse<LoginResponseType>>('/auth/me', {})
    },

}

export const profileAPI = {
    getProfile() {
        return instance.post<{}, AxiosResponse<ProfileType>>("/auth/me")
    },
    updateProfile(name: string, avatar: string) {
        return instance.put<{}, AxiosResponse<ResponseUpdateUser>>("/auth/me", {name, avatar})
    }
}



