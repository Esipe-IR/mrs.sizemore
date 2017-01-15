import { REQUEST, RECEIVE, GAME_STATE } from '../constants'

const apiReducer = (state = GAME_STATE, action) => {
    switch(action.type) {
    case REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            hasFailed: false
        })
    case RECEIVE:
        return Object.assign({}, state, {
            isFetching: false,
            hasFailed: action.error,
            payload: action.payload
        })
    default:
        return state
    }
}

export default apiReducer
