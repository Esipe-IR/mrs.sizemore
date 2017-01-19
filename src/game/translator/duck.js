const RESPONSE = "old_wood/translator/RESPONSE"

const INITIAL_STATE = {
    result: null
}

export const translateResponse = (status, msg, word_id) => {
    return {
        type: RESPONSE,
        payload: {
            status: status,
            word_id: word_id,
            msg: msg
        }
    }
}

export default function translatorReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case RESPONSE:
            return Object.assign({}, state, {
                result: action.payload
            })
        default:
            return state
    }
}
