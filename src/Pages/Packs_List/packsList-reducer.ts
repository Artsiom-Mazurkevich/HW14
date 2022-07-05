import {ThunkType} from "../../bll/store";
import {setLoadingStatus} from "../../bll/reducers/app-reducers";
import {cardsAPI} from "../../api/API";


export type CardType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "deckCover": string
    "cardsCount": number
    "type": string
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
}

type InitialStateType = {
    cardPacks: Array<CardType>
    "page": number
    "pageCount": number
    "cardPacksTotalCount": number
    "minCardsCount": number
    "maxCardsCount": number
    "token": string
    "tokenDeathTime": number
}



const initialState: InitialStateType = {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}






export const packsListReducer = (state:InitialStateType = initialState, action: PacksListActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state,
                cardPacks: action.responseGetCardsPack.cardPacks,
                page: action.responseGetCardsPack.page,
                pageCount: action.responseGetCardsPack.pageCount,
                cardPacksTotalCount: action.responseGetCardsPack.cardPacksTotalCount,
                minCardsCount: action.responseGetCardsPack.minCardsCount,
                maxCardsCount: action.responseGetCardsPack.maxCardsCount,
                token: action.responseGetCardsPack.token,
                tokenDeathTime: action.responseGetCardsPack.tokenDeathTime,
            }
        default:
            return state
    }
}


const setCards = (responseGetCardsPack: InitialStateType) => ({type: 'SET-CARDS', responseGetCardsPack} as const)


export const getCardsTC = ():ThunkType => dispatch => {
    dispatch(setLoadingStatus("loading"));
    cardsAPI.getCards().then(res => {
        dispatch(setCards(res.data))
        console.log(res)
        dispatch(setLoadingStatus("idle"))
    })
}



export const filterCardsTC = (min: number, max: number, page: number = 1):ThunkType => dispatch => {
    cardsAPI.filterCountCards(min, max, page).then(res => {
        dispatch(setCards(res.data))
    })
}



export type PacksListActionsType = ReturnType<typeof setCards>


