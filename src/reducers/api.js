import {REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILED} from '../constants'

const apiReducer = (state = {}, action) => {
    switch(action.type) {
    case REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            hasFailed: false
        })
    case RECEIVE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            hasFailed: false,
            json: action.json
        })
    case RECEIVE_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            hasFailed: true,
            err: action.err
        })
    default:
        return state
    }
}

export default apiReducer
