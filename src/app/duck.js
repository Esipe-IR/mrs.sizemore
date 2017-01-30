import { getFingerPrint } from '../services/fingerprint'
import { getCurrentUser } from '../services/firebase'

const LOADING_ERROR = "old_wood/app/LOADING::ERROR"
const LOADING_USER = "old_wood/app/LOADING::USER"
const LOADING_FINGERPRINT = "old_wood/app/LOADING::FINGERPRINT"
const LOADING_STATE = "old_wood/app/LOADING::STATE"

const INITIAL_STATE = {
    loading: true,
    fingerprint: "",
    user: null,
    error: null,
    errorMsg: ''
}

export const loadingError = (status, err) => {
    return {
        type: LOADING_ERROR,
        payload: err,
        error: status
    }
}

export const loadingUser = (user) => {
    return {
        type: LOADING_USER,
        payload: user
    }
}

export const loadingFingerprint = (fingerprint) => {
    return {
        type: LOADING_FINGERPRINT,
        payload: fingerprint
    }
}

export const loadingState = (state) => {
    return {
        type: LOADING_STATE,
        payload: state
    }
}

export const fetchFingerprint = () => (dispatch) => {
    getFingerPrint()
    .then(result => dispatch(loadingFingerprint(result)))
}

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .then(u => dispatch(loadingUser(u)))
}

export default function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOADING_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                errorMsg: action.payload
            })
        case LOADING_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        case LOADING_FINGERPRINT:
            return Object.assign({}, state, {
                fingerprint: action.payload
            })
        case LOADING_STATE:
            return Object.assign({}, state, {
                loading: action.payload
            })
        default:
            return state
    }
}
