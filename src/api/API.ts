import axios, {AxiosResponse} from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";
import {RegistrationResponseType} from "../bll/reducers/registration-reducer";
import {ProfileType, ResponseUpdateUser} from "../bll/reducers/profile-reducer";




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
        return instance.post<{}, AxiosResponse<ProfileType>>("/auth/me", {})
    },
    updateProfile(name: string, avatar: string) {
        return instance.put<{}, AxiosResponse<ResponseUpdateUser>>("/auth/me", {name, avatar})
    }
}


export const cardsAPI = {

    //=======================1========================
    /*getCards () {
        return instance.get(`cards/pack?pageCount=7`)
    },
    filterCountCards (min: number, max: number, page: number = 1) {
        return instance.get(`cards/pack?pageCount=7&min=${min}&max=${max}&page=${page}`)
    },*/
    //=======================1========================


    //================2====================
   /* getCards () {
        return instance.get(`cards/pack`)
    },

    changeCountPacksOnPage (pageCount: string) {
        return instance.get(`cards/pack?pageCount=${pageCount}`)
    },
    set_MinMax_Cards (value: Array<number>) {
        return instance.get(`cards/pack?min=${value[0]}&max=${value[1]}`)
    }*/
    //================2====================



    //========================3==========================
    getTestCards (cardsCountOnPage: string, currentPage: number, min:number, max: number) {
        //return instance.get(`cards/pack?pageCount=${cardsCountOnPage}&page=${currentPage}&min=${min}&max=${max}`)
        return instance.get(`cards/pack`, {params:{pageCount: cardsCountOnPage, page: currentPage, min, max}})
    },
    createCard (name: string, deckCover: string, isPrivate: boolean) {
      return instance.post(`cards/pack`, {cardsPack: {name, deckCover, private: isPrivate}})
    }
    //========================3==========================

}



