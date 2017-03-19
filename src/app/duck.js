import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { addNotification as notify } from 'reapop'

const UPDATE_LOADING = "mrs.sizemore/app/UPDATE::LOADING"
const UPDATE_SIDEBAR = "mrs.sizemore/app/UPDATE::SIDEBAR"

const INITIAL_STATE = Map({
    loading: false
})

export const updateLoading = createAction(UPDATE_LOADING)
export const updateSidebar = createAction(UPDATE_SIDEBAR)

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
    dispatch(notify({
        message: msg,
        status: "error"
    }))
}

export default handleActions({
    [UPDATE_LOADING]: (state, action) => state.set("loading", action.payload),
    [UPDATE_SIDEBAR]: (state, action) => state.set("sidebar", action.payload)
}, INITIAL_STATE)
