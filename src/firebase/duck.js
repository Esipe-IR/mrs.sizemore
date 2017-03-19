import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { Map, fromJS } from 'immutable'
import { notifSuccess, notifError, updateLoading } from '../app/duck'
import {
    createUser,
    connectUser,
    connectUserWithToken,
    logoutUser,
    getCurrentUser,
    getWorksheets,
    getCompleteWorksheet,
    getWord,
    setWorksheet,
    setCompleteWorksheet,
    setWord
} from '../services/firebase'

const INITIAL_STATE = Map({})

const UPDATE_USER = "mrs.sizemore/firebase/UPDATE::USER"
const UPDATE_WORKSHEETS = "mrs.sizemore/firebase/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "mrs.sizemore/firebase/UPDATE::WORKSHEET"
const UPDATE_WORD = "mrs.sizemore/firebase/UPDATE::WORD"

const ERROR_USER = "mrs.sizemore/firebase/ERROR::USER"
const ERROR_WORKSHEETS = "mrs.sizemore/firebase/ERROR::WORKSHEETS"
const ERROR_WORKSHEET = "mrs.sizemore/firebase/ERROR::WORKSHEET"
const ERROR_WORD = "mrs.sizemore/firebase/ERROR::WORD"

export const updateUser = createAction(UPDATE_USER)
export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)
export const updateWord = createAction(UPDATE_WORD)

export const errorUser = createAction(ERROR_USER)
export const errorWorksheets = createAction(ERROR_WORKSHEETS)
export const errorWorksheet = createAction(ERROR_WORKSHEET)
export const errorWord = createAction(ERROR_WORD)

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .map(u => {
        if (u) {
            return {
                email: u.email, 
                emailVerified: u.emailVerified, 
                role: u.role
            }
        }

        return null
    })
    .subscribe(
        u => dispatch(updateUser(fromJS(u)))
    )
}

const onUserSuccess = (dispatch, msg) => {
    dispatch(notifSuccess(msg))
    dispatch(fetchUser())
    dispatch(push('/'))
}

export const register = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(notifError("No information submit"))
        return
    }

    window.FB.AppEvents.logEvent("register")

    createUser(user.email, user.password)
    .subscribe(
        () => onUserSuccess(dispatch, "Well register"),
        err => dispatch(notifError(err.toString()))
    )
}

export const connexion = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(notifError("No information submit"))
        return
    }

    window.FB.AppEvents.logEvent("connexion")
    
    connectUser(user.email, user.password)
    .subscribe(
        resp => onUserSuccess(dispatch, "Well connected"),
        err => dispatch(notifError(err.toString()))
    )
}

export const connexionToken = (token) => (dispatch) => {
    if (!token) {
        dispatch(notifError("No token submit"))
        return
    }

    window.FB.AppEvents.logEvent("connexionToken")

    connectUserWithToken(token)
    .subscribe(
        resp => onUserSuccess(dispatch, "Well connected"),
        err => dispatch(notifError(err.toString()))
    )
}

export const logout = () => (dispatch) => {
    window.FB.AppEvents.logEvent("logout")

    logoutUser()
    .subscribe(
        () => dispatch(updateUser(null)),
        err => dispatch(notifError(err.toString()))
    )
}

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .subscribe(
        response => dispatch(updateWorksheets(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .subscribe(
        response => dispatch(updateWorksheet(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const fetchWord = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getWord(id)
    .subscribe(
        response => dispatch(updateWord(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const editWorksheet = (worksheet) => (dispatch) => {
    dispatch(updateLoading(true))

    window.FB.AppEvents.logEvent("editWorksheet")

    setWorksheet(worksheet.id, worksheet)
    .subscribe(
        () => dispatch(notifSuccess("Successfully update")),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const editWord = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    window.FB.AppEvents.logEvent("editWord")

    setWord(word.id, word)
    .subscribe(
        () => dispatch(notifSuccess("Successfully update")),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const createWord = (word) => (dispatch) => {
    window.FB.AppEvents.logEvent("createWord")

    setWord(null, word)
    .subscribe(
        () => dispatch(notifSuccess("Successfully create")),
        err => dispatch(notifError(err.toString()))
    )
}

export const createWorksheet = (worksheet, words) => (dispatch) => {
    window.FB.AppEvents.logEvent("createWorksheet")

    setCompleteWorksheet(null, worksheet, words)
    .subscribe(
        response => dispatch(notifSuccess("Successfully create")),
        err => dispatch(notifError(err.toString()))
    )
}

export const deleteWord = (id) => (dispatch) => {
    window.FB.AppEvents.logEvent("deleteWord")

    setWord(id, null)
    .subscribe(
        () => dispatch(notifSuccess("Successfully delete")),
        err => dispatch(notifError(err.toString()))
    )
}

export default handleActions({
    [UPDATE_USER]: (state, action) => state.set("user", action.payload),
    [UPDATE_WORKSHEETS]: (state, action) => state.set("worksheets", action.payload),
    [UPDATE_WORKSHEET]: (state, action) => state.set("worksheet", action.payload),
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload),
    [ERROR_USER]: (state, action) => state.set("error_user", action.payload),
    [ERROR_WORKSHEETS]: (state, action) => state.set("error_worksheets", action.payload),
    [ERROR_WORKSHEET]: (state, action) => state.set("error_worksheet", action.payload),
    [ERROR_WORD]: (state, action) => state.set("error_word", action.payload)
}, INITIAL_STATE)
