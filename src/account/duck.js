import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { createUser, connectUser } from '../services/firebase'
import { updateError, updateSuccess, fetchUser } from '../app/duck'
import { push } from 'react-router-redux'

const UPDATE_ACTION = "old_wood/account/UPDATE::ACTION"
const UPDATE_USER = "old_wood/account/UPDATE::USER"

const INITIAL_STATE = Map({
    action: false,
    user: {
        email: "",
        password: ""
    }
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateUser = createAction(UPDATE_USER)

export const register = (user) => (dispatch) => {
    createUser(user.email, user.password)
    .then(result => dispatch(updateSuccess("Well register")))
    .catch(error => dispatch(updateError(error)))
}

export const connexion = (user) => (dispatch) => {
    connectUser(user.email, user.password)
    .then(result => {
        dispatch(updateSuccess("Well connected"))
        dispatch(fetchUser())
        dispatch(push('/'))
    })
    .catch(error => dispatch(updateError(error)))
}

export default handleActions({
    [updateAction]: (state, action) => state.set("action", action.payload),
    [updateUser]: (state, action) => state.set("user", action.payload)
}, INITIAL_STATE)
