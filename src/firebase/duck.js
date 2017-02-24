import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { Map } from 'immutable'
import { notifSuccess, notifError, updateLoading } from '../app/duck'
import { updateError } from '../account/duck'
import {
    createUser,
    connectUser,
    logoutUser,
    getCurrentUser,
    getWorksheets,
    getCompleteWorksheet,
    getWord,
    update,
    create,
    del
} from '../services/firebase'

const INITIAL_STATE = Map({})

const UPDATE_USER = "mrs.sizemore/firebase/UPDATE::USER"
const UPDATE_WORKSHEETS = "mrs.sizemore/firebase/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "mrs.sizemore/firebase/UPDATE::WORKSHEET"
const UPDATE_WORD = "mrs.sizemore/firebase/UPDATE::WORD"

export const updateUser = createAction(UPDATE_USER)
export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)
export const updateWord = createAction(UPDATE_WORD)

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .then(u => dispatch(updateUser(u)))
}

export const register = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(updateError(new Error()))
        dispatch(notifError("No information submit"))
        return
    }

    createUser(user.email, user.password)
    .then(() => dispatch(notifSuccess("Well register")))
    .then(() => dispatch(fetchUser()))
    .then(() => dispatch(push('/')))
    .catch(err => {
        dispatch(updateError(err))
        dispatch(notifError(err.toString()))
    })
}

export const connexion = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(updateError(new Error()))
        dispatch(notifError("No information submit"))
        return
    }
    
    connectUser(user.email, user.password)
    .then(() => dispatch(notifSuccess("Well connected")))
    .then(() => dispatch(fetchUser()))
    .then(() => dispatch(push('/')))
    .catch(err => {
        dispatch(updateError(err))
        dispatch(notifError(err.toString()))
    })
}

export const logout = () => (dispatch) => {
    logoutUser()
    .then(() => dispatch(updateUser(null)))
    .then(() => dispatch(push('/logout')))
    .catch(err => dispatch(notifError(err.toString())))
}

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .subscribe(response => console.log(response))
    // .then(response => dispatch(updateWorksheets(response)))
    // .then(() => dispatch(updateLoading(false)))
    // .catch(err => {
    //     dispatch(notifError(err.toString()))
    //     dispatch(updateLoading(false))
    // })
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .then(response => dispatch(updateWorksheet(response)))
    .then(() => dispatch(updateLoading(false)))
    .catch(err => {
        dispatch(notifError(err.toString()))
        dispatch(updateLoading(false))
    })
}

export const fetchWord = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getWord(id)
    .then(response => dispatch(updateWord(response)))
    .then(() => dispatch(updateLoading(false)))
    .catch(err => {
        dispatch(notifError(err.toString()))
        dispatch(updateLoading(false))
    })
}

export const editWorksheet = (worksheet) => (dispatch) => {
    update("/worksheets/" + worksheet.id, worksheet)
    .then(() => dispatch(notifSuccess("Successfully update")))
    .catch(err => dispatch(notifError(err.toString())))
}

export const editWord = (word) => (dispatch) => {
    update("/words/" + word.id, word)
    .then(() => dispatch(notifSuccess("Successfully update")))
    .catch(err => dispatch(notifError(err.toString())))
}

export const createWord = (word) => (dispatch) => {
    create("words", word)
    .then(() => dispatch(notifSuccess("Successfully create")))
    .catch(err => dispatch(notifError(err.toString())))
}

export const createWorksheet = (worksheet, words) => (dispatch) => {
    create("worksheets", worksheet)
    .then(response => {
        if (words) {
            words.forEach((w, i) => {
                w.worksheet = response.get("id")
                dispatch(createWord(w))
            })
        }

        dispatch(notifSuccess("Successfully create"))
    })
    .catch(err => dispatch(notifError(err.toString())))
}

export const deleteWord = (word) => (dispatch) => {
    del("/words/" + word)
    .then()
    .catch(err => dispatch(notifError(err.toString())))
}

export default handleActions({
    [UPDATE_USER]: (state, action) => state.set("user", action.payload),
    [UPDATE_WORKSHEETS]: (state, action) => state.set("worksheets", action.payload),
    [UPDATE_WORKSHEET]: (state, action) => state.set("worksheet", action.payload),
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload)
}, INITIAL_STATE)
