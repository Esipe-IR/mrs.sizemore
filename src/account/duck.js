import { editKey } from '../services/obj'
import { createUser, connectUser } from '../services/firebase'

const USER_SET = "old_wood/account/USER::SET"
const EDIT_ACTION = "old_wood/account/EDIT::ACTION"
const ERROR = "old_wood/account/ERROR"

const INITIAL_STATE = {
    action: false,
    user: {
        email: "",
        password: "",
        defined: false
    },
    error: null,
    errorMsg: ""
}

export const editAction = (action) => {
    return {
        type: EDIT_ACTION,
        payload: action
    }
}

export const editField = (key, value, former) => {
    let newUser = editKey([key], value, former)

    return {
        type: USER_SET,
        payload: newUser
    }
}

export const setUser = (user) => {
    user.defined = true

    return {
        type: USER_SET,
        payload: user
    }
}

export const spreadError = (status, error) => {
    return {
        type: ERROR,
        payload: error,
        error: status
    }
}

export const register = (user) => (dispatch) => {
    createUser(user.email, user.password)
    .then(result => {
        dispatch(spreadError(false, 'Welcome'))
        dispatch(setUser(user))
    })
    .catch(error => dispatch(spreadError(true, error.message)))
}

export const connexion = (user) => (dispatch) => {
    connectUser(user.email, user.password)
    .then(result => {
        dispatch(spreadError(false, 'Welcome'))
        dispatch(setUser(user))
    })
    .catch(error => dispatch(spreadError(true, error.message)))
}

export default function accountReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case EDIT_ACTION:
            return Object.assign({}, state, {
                action: action.payload
            })
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
