import axios, {AxiosResponse} from "axios";
import {RegistrationResponseType} from "../bll/reducers/registration-reducer";
import {LogoutResponse, ProfileStateType} from "../bll/reducers/profile-reducer";
import {LoginParamsType} from "../bll/reducers/login-reducer";

export type UpdatedProfileType = {
    updatedUser: ProfileStateType,
    error?: string
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
    /*baseURL: "http://localhost:7542/2.0",*/
    withCredentials: true,
})


export const authApi = {
    register(email: string, password: string) {
        return instance.post<AxiosResponse<RegistrationResponseType>>("/auth/register", {
            email,
            password
        })
    },
    login(values: LoginParamsType) {
        return instance.post<AxiosResponse<ProfileStateType>>("/auth/login", values)
    },
    authMe(){
        return instance.post<ProfileStateType>('/auth/me', {})
    },
}

export const profileAPI = {
    updateProfile(name: string, avatar: string) {
        return instance.put<UpdatedProfileType>("/auth/me", {name, avatar})
    },
    logout() {
        return instance.delete<LogoutResponse>("/auth/me")
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
    getTestCards (cardsCountOnPage: string, currentPage: number, min:number, max: number, sortPacks: string, packName: string, user_id: string) {
        //return instance.get(`cards/pack?pageCount=${cardsCountOnPage}&page=${currentPage}&min=${min}&max=${max}`)
        return instance.get(`cards/pack`, {params:{pageCount: cardsCountOnPage, page: currentPage, min, max, sortPacks, packName, user_id}})
    },
    createCard (name: string, deckCover: string, isPrivate: boolean) {
      return instance.post(`cards/pack`, {cardsPack: {name, deckCover, private: isPrivate}})
    },
    deleteCardsPack (id: string) {
        return instance.delete(`cards/pack`, {params:{id}})
    }
    //========================3==========================

}



