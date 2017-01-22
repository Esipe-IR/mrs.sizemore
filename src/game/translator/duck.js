const RESPONSE = "old_wood/translator/RESPONSE"
const SWITCH_STATE = "old_wood/translator/SWITCH::STATE"

const INITIAL_STATE = {
    switch: false,
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

export const switchState = (state) => {
    return  {
        type: SWITCH_STATE,
        payload: state
    }
}

export default function translatorReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case RESPONSE:
            return Object.assign({}, state, {
                result: action.payload
            })
        case SWITCH_STATE:
            return Object.assign({}, state, {
                switch: action.payload
            })
        default:
            return state
    }
}
