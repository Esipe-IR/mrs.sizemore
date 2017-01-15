import { REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILED, DEFAULT_API } from '../constants'

const apiReducer = (state = DEFAULT_API, action) => {
    switch(action.type) {
    case REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            theme: action.theme,
            worksheet: action.worksheet,
        })
    case RECEIVE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            error: false,
            words: action.words,
            definitions: action.definitions,
            examples: action.examples
        })
    case RECEIVE_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            error: action.error,
            words: [],
            definitions: [],
            examples: []
        })
    default:
        return state
    }
}

export default apiReducer
