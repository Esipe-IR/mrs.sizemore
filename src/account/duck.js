import { createAction, handleActions } from 'redux-actions'
import { editKey } from '../services/obj'
import { createUser, connectUser } from '../services/firebase'

const USER_SET = "old_wood/account/USER::SET"
const UPDATE_USER = "old_wood/account/UPDATE::USER"
const UPDATE_ACTION = "old_wood/account/UPDATE::ACTION"
const ERROR = "old_wood/account/ERROR"

const INITIAL_STATE = {
    action: false,
    user: null
}

export const updateAction = createAction(UPDATE_ACTION)

export const editField = (key, value, former) => {
    let newUser = editKey([key], value, former)

    return {
        type: USER_SET,
        payload: newUser
    }
}

export const register = (user) => (dispatch) => {
    createUser(user.email, user.password)
    .then(result => {
        //dispatch(spreadError(false, 'Welcome'))
        //dispatch(setUser(user))
    })
    //.catch(error => dispatch(spreadError(true, error.message)))
}

export const connexion = (user) => (dispatch) => {
    connectUser(user.email, user.password)
    .then(result => {
        //dispatch(spreadError(false, 'Welcome'))
        //dispatch(setUser(user))
    })
    //.catch(error => dispatch(spreadError(true, error.message)))
}

export default function accountReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_SET:
            return Object.assign({}, state, {
                user: action.payload
            })
        case ERROR:
            return Object.assign({}, state, {
                error: action.error,
                errorMsg: action.payload
            })
        default:
            return state
    }
}
