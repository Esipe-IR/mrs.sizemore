import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { notifLoading, notifError } from '../app/duck'
import { connexionToken } from '../firebase/duck'
import { checkAuth } from '../services/api/cas-auth'

const UPDATE_ACTION = "mrs.sizemore/account/UPDATE::ACTION"
const UPDATE_ERROR = "mrs.sizemore/account/UPDATE::ERROR"

const INITIAL_STATE = Map({
    action: false
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateError = createAction(UPDATE_ERROR)

export const connectUPEM = () => (dispatch) => {
    dispatch(notifLoading("Asking API"))

    checkAuth()
    .catch(err => dispatch(notifError(err.toString())))
    .subscribe(data => dispatch(connexionToken(data.token)))
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_ERROR]: (state, action) => state.set("error", action.payload)
}, INITIAL_STATE)
