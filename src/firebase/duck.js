import { createAction, handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { Map, fromJS } from 'immutable'
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
    setWorksheet,
    setCompleteWorksheet,
    setWord
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
    .map(u => (u ? {email: u.email, emailVerified: u.emailVerified, role: u.role} : null))
    .subscribe(
        u => dispatch(updateUser(fromJS(u)))
    )
}

export const register = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(updateError(true))
        dispatch(notifError("No information submit"))
        return
    }

    createUser(user.email, user.password)
    .subscribe(
        () => {
            dispatch(notifSuccess("Well register"))
            dispatch(fetchUser())
            dispatch(push('/'))
        },
        err => {
            dispatch(updateError(true))
            dispatch(notifError(err.toString()))
        }
    )
}

export const connexion = (user) => (dispatch) => {
    if (!user.email && !user.password) {
        dispatch(updateError(true))
        dispatch(notifError("No information submit"))
        return
    }
    
    connectUser(user.email, user.password)
    .subscribe(
        resp => {
            dispatch(notifSuccess("Well connected"))
            dispatch(fetchUser())
            dispatch(push('/'))
        },
        err => {
            dispatch(updateError(true))
            dispatch(notifError(err.toString()))
        }
    )
}

export const logout = () => (dispatch) => {
    logoutUser()
    .subscribe(
        () => {
            dispatch(updateUser(null))
            dispatch(push('/logout'))
        },
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

    setWorksheet(worksheet.id, worksheet)
    .subscribe(
        () => dispatch(notifSuccess("Successfully update")),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const editWord = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    setWord(word.id, word)
    .subscribe(
        () => dispatch(notifSuccess("Successfully update")),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const createWord = (word) => (dispatch) => {
    setWord(null, word)
    .subscribe(
        () => dispatch(notifSuccess("Successfully create")),
        err => dispatch(notifError(err.toString()))
    )
}

export const createWorksheet = (worksheet, words) => (dispatch) => {
    setCompleteWorksheet(null, worksheet, words)
    .subscribe(
        response => dispatch(notifSuccess("Successfully create")),
        err => dispatch(notifError(err.toString()))
    )
}

export const deleteWord = (id) => (dispatch) => {
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
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload)
}, INITIAL_STATE)
