import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { addNotification as notify } from 'reapop'
import { logEvent } from '../services/analytics'

const UPDATE_LOADING = "mrs.sizemore/app/UPDATE::LOADING"

const INITIAL_STATE = Map({
    loading: false
})

export const updateLoading = createAction(UPDATE_LOADING)

export const notifLoading = (msg) => (dispatch) => {
    dispatch(notify({
        message: msg,
        status: "loading"
    }))
}

export const notifSuccess = (msg) => (dispatch) => {
    dispatch(notify({
        message: msg,
        status: "success"
    }))
}

export const notifError = (msg) => (dispatch) => {
    logEvent("errorAPP", null, {msg: msg})
    
    dispatch(notify({
        message: msg,
        status: "error"
    }))
}

export default handleActions({
    [UPDATE_LOADING]: (state, action) => state.set("loading", action.payload)
}, INITIAL_STATE)
