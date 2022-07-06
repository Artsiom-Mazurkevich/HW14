import {RootState, store, ThunkType} from "../../bll/store";
import {cardsAPI} from "../../api/API";

type SortPacksType = '0updated' | '1updated'


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
    "sortPacks": SortPacksType
}



const initialState: InitialStateType = {
    cardPacks: [],
    page: 1,
    pageCount: 1,
    cardPacksTotalCount: 1,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '0updated',
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
        case "CHANGE-PAGE":
            return {...state,
                page: action.page
            }
        case "SORT-PACKS-BY-DATE":
            return {...state,
                sortPacks: action.sortPack
            }
        default:
            return state
    }
}

export const setCards = (responseGetCardsPack: InitialStateType) => ({type: 'SET-CARDS', responseGetCardsPack} as const)
export const changePage = (page: number) => ({type: 'CHANGE-PAGE', page} as const)
export const sortPacksByDate = (sortPack: SortPacksType) => ({type: 'SORT-PACKS-BY-DATE', sortPack} as const)

//===========================1=============================
/*export const getCardsTC = ():ThunkType => dispatch => {
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
}*/
//===========================1=============================


export const getCardsTC =
    (
    cardsCountOnPage: string,
    currentPage: number,
    min:number,
    max: number,
    sortPacks: string = '0updated',
    packName: string = '',
    user_id: string = ''
    ):ThunkType => dispatch =>
    {
    cardsAPI.getTestCards(cardsCountOnPage, currentPage, min, max, sortPacks, packName, user_id).then
    (
        res => {
        dispatch(setCards(res.data))
        }
    )
}


/*const {page, minCardsCount, maxCardsCount, sortPacks} = store.getState().packsList
const pageCount = String(store.getState().packsList.pageCount)*/


export const deleteCardsPackTC = (id: string):ThunkType => dispatch => {
    const {page, minCardsCount, maxCardsCount, sortPacks} = store.getState().packsList
    const pageCount = String(store.getState().packsList.pageCount)
    cardsAPI.deleteCardsPack(id).then(res => {
        dispatch(getCardsTC(pageCount, page, minCardsCount, maxCardsCount, sortPacks))
    })
}



export const createNewCardTC = (name: string, deckCover: string = '', isPrivate: boolean = false):ThunkType => dispatch => {
    cardsAPI.createCard(name, deckCover ,isPrivate).then(res => {
        alert('card added')
    })
}





export type PacksListActionsType = ReturnType<typeof setCards>
    | ReturnType<typeof changePage>
    | ReturnType<typeof sortPacksByDate>












