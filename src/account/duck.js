import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { push } from 'react-router-redux'
import { addNotification as notify } from 'reapop'
import { fetchUser } from '../app/duck'
import { createUser, connectUser } from '../services/firebase'

const UPDATE_ACTION = "old_wood/account/UPDATE::ACTION"
const UPDATE_USER = "old_wood/account/UPDATE::USER"
const UPDATE_ERROR = "old_wood/account/UPDATE::ERROR"

const INITIAL_STATE = Map({
    action: false
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateUser = createAction(UPDATE_USER)
export const updateError = createAction(UPDATE_ERROR)

export const register = (user) => (dispatch) => {
    if (!user) {
        dispatch(updateError(new Error()))
        dispatch(notify({message: "No information submit", status: "error"}))
        return
    }

    createUser(user.get("email"), user.get("password"))
    .then(result => dispatch(notify({message: "Well register", status: "success"})))
    .catch(err => {
        dispatch(updateError(err))
        dispatch(notify({message: err.toString(), status: "error"}))
    })
}

export const connexion = (user) => (dispatch) => {
    if (!user) {
        dispatch(updateError(new Error()))
        dispatch(notify({message: "No information submit", status: "error"}))
        return
    }
    
    connectUser(user.get("email"), user.get("password"))
    .then(result => {
        dispatch(notify({message: "Well connected", status: "success"}))
        dispatch(fetchUser())
        dispatch(push('/'))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(notify({message: err.toString(), status: "error"}))
    })
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_USER]: (state, action) => state.set("user", action.payload),
    [UPDATE_ERROR]: (state, action) => state.set("error", action.error)
}, INITIAL_STATE)
