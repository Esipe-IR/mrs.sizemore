import { getFingerPrint } from '../services/fingerprint'

const LOADING_FINGERPRINT = "old_wood/app/LOADING::FINGERPRINT"
const LOADING_STATE = "old_wood/app/LOADING::STATE"

const INITIAL_STATE = {
    loading: true,
    fingerprint: ""
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
    return getFingerPrint()
    .then(result => dispatch(loadingFingerprint(result)))
}

export default function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
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
