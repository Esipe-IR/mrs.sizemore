import { TRANSLATE_ANSWER, RECEIVE_FIREBASE, DEFAULT_GAME_STATE } from '../constants'

const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
    switch(action.type) {
        case TRANSLATE_ANSWER:
            return Object.assign({}, state, {
                result: action.payload
            })
        case RECEIVE_FIREBASE:
            return Object.assign({}, state, {
                worksheet: action.payload
            })
        default:
            return state
    }
}

export default gameReducer
