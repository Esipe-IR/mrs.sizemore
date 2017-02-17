import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { push } from 'react-router-redux'
import { updateError, updateSuccess, fetchUser } from '../app/duck'
import { createUser, connectUser } from '../services/firebase'

const UPDATE_ACTION = "old_wood/account/UPDATE::ACTION"
const UPDATE_USER = "old_wood/account/UPDATE::USER"

const INITIAL_STATE = Map({
    action: false
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateUser = createAction(UPDATE_USER)

export const register = (user) => (dispatch) => {
    if (!user) {
        return dispatch(updateError(new Error("No information submit")))
    }

    createUser(user.get("email"), user.get("password"))
    .then(result => dispatch(updateSuccess("Well register")))
    .catch(error => dispatch(updateError(error)))
}

export const connexion = (user) => (dispatch) => {
    if (!user) {
        return dispatch(updateError(new Error("No information submit")))
    }
    
    connectUser(user.get("email"), user.get("password"))
    .then(result => {
        dispatch(updateSuccess("Well connected"))
        dispatch(fetchUser())
        dispatch(push('/'))
    })
    .catch(error => dispatch(updateError(error)))
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_USER]: (state, action) => state.set("user", action.payload)
}, INITIAL_STATE)
