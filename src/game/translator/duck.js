const INPUT_CHANGE = "old_wood/translator/INPUT::CHANGE"
const RESPONSE = "old_wood/translator/RESPONSE"

const INITIAL_STATE = {
    switch: false,
    result: null,
    userWord: ""
}

export const inputChange = (val) => {
    return {
        type: INPUT_CHANGE,
        payload: val
    }
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
        case INPUT_CHANGE:
            return Object.assign({}, state, {
                userWord: action.payload
            })
        case RESPONSE:
            return Object.assign({}, state, {
                result: action.payload
            })
        default:
            return state
    }
}
