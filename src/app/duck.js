import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { push } from 'react-router-redux'
import { addNotification as notify } from 'reapop'
import { getFingerPrint } from '../services/fingerprint'
import { logoutUser, getCurrentUser, getWorksheets, getCompleteWorksheet, getWord, update, create, del } from '../services/firebase'

const UPDATE_USER = "old_wood/app/UPDATE::USER"
const UPDATE_FINGERPRINT = "old_wood/app/UPDATE::FINGERPRINT"
const UPDATE_LOADING = "old_wood/app/UPDATE::LOADING"
const UPDATE_WORKSHEETS = "old_wood/app/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "old_wood/app/UPDATE::WORKSHEET"
const UPDATE_WORD = "old_wood/app/UPDATE::WORD"
const UPDATE_SIDEBAR = "old_wood/app/UPDATE::SIDEBAR"
const UPDATE_MODAL = "old_wood/app/UPDATE::MODAL"

const INITIAL_STATE = Map({
    loading: true
})

export const updateUser = createAction(UPDATE_USER)
export const updateFingerprint = createAction(UPDATE_FINGERPRINT)
export const updateLoading = createAction(UPDATE_LOADING)
export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)
export const updateWord = createAction(UPDATE_WORD)
export const updateSidebar = createAction(UPDATE_SIDEBAR)
export const updateModal = createAction(UPDATE_MODAL)

export const logout = () => (dispatch) => {
    logoutUser()
    .then(() => {
        dispatch(updateUser(null))
        dispatch(push('/logout'))
    })
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export const fetchFingerprint = () => (dispatch) => {
    getFingerPrint()
    .then(result => dispatch(updateFingerprint(result)))
}

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .then(u => dispatch(updateUser(u)))
}

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .then(response => {
        dispatch(updateWorksheets(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(notify({
            message: err.toString(),
            status: "error"
        }))
        dispatch(updateLoading(false))
    })
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .then(response => {
        dispatch(updateWorksheet(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(notify({
            message: err.toString(),
            status: "error"
        }))
        dispatch(updateLoading(false))
    })
}

export const fetchWord = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getWord(id)
    .then(response => {
        dispatch(updateWord(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(notify({
            message: err.toString(),
            status: "error"
        }))
        dispatch(updateLoading(false))
    })
}

export const editWorksheet = (worksheet) => (dispatch) => {
    update("/worksheets/" + worksheet.id, worksheet)
    .then(response => dispatch(notify({
        message: "Successfully update",
        status: "success"
    })))
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export const editWord = (word) => (dispatch) => {
    update("/words/" + word.id, word)
    .then(response => dispatch(notify({
        message: "Successfully update",
        status: "success"
    })))
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export const createWorksheet = (worksheet, words) => (dispatch) => {
    create("worksheets", worksheet)
    .then(response => {
        if (words) {
            words.forEach((w, i) => {
                w.worksheet = response.get("id")
                
                create("words", w)
                .catch(err => dispatch(notify({
                    message: err.toString(),
                    status: "error"
                })))
            })
        }

        dispatch(notify({
            message: "Successfully create",
            status: "success"
        }))
    })
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export const createWord = (word) => (dispatch) => {
    create("words", word)
    .then(response => dispatch(notify({
        message: "Successfully create",
        status: "success"
    })))
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export const deleteWord = (word) => (dispatch) => {
    del("/words/" + word)
    .then()
    .catch(err => dispatch(notify({
        message: err.toString(),
        status: "error"
    })))
}

export default handleActions({
    [UPDATE_USER]: (state, action) => state.set("user", action.payload),
    [UPDATE_FINGERPRINT]: (state, action) => state.set("fingerprint", action.payload),
    [UPDATE_LOADING]: (state, action) => state.set("loading", action.payload),
    [UPDATE_WORKSHEETS]: (state, action) => state.set("worksheets", action.payload),
    [UPDATE_WORKSHEET]: (state, action) => state.set("worksheet", action.payload),
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload),
    [UPDATE_SIDEBAR]: (state, action) => state.set("sidebar", action.payload),
    [UPDATE_MODAL]: (state, action) => state.set("modal", action.payload)
}, INITIAL_STATE)
