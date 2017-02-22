import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { push } from 'react-router-redux'
import { addNotification as notify } from 'reapop'
import { getFingerPrint } from '../services/fingerprint'

const UPDATE_FINGERPRINT = "mrs.sizemore/app/UPDATE::FINGERPRINT"
const UPDATE_LOADING = "mrs.sizemore/app/UPDATE::LOADING"
const UPDATE_SIDEBAR = "mrs.sizemore/app/UPDATE::SIDEBAR"
const UPDATE_MODAL = "mrs.sizemore/app/UPDATE::MODAL"

const INITIAL_STATE = Map({
    loading: true
})

export const updateFingerprint = createAction(UPDATE_FINGERPRINT)
export const updateLoading = createAction(UPDATE_LOADING)
export const updateSidebar = createAction(UPDATE_SIDEBAR)
export const updateModal = createAction(UPDATE_MODAL)

export const fetchFingerprint = () => (dispatch) => {
    getFingerPrint()
    .then(result => dispatch(updateFingerprint(result)))
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
    [UPDATE_FINGERPRINT]: (state, action) => state.set("fingerprint", action.payload),
    [UPDATE_LOADING]: (state, action) => state.set("loading", action.payload),
    [UPDATE_SIDEBAR]: (state, action) => state.set("sidebar", action.payload),
    [UPDATE_MODAL]: (state, action) => state.set("modal", action.payload)
}, INITIAL_STATE)
