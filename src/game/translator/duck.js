const INPUT_CHANGE = "old_wood/translator/INPUT::CHANGE"
const RESPONSE = "old_wood/translator/RESPONSE"
const WORD_NEW = "old_wood/translator/WORD::NEW"

const INITIAL_STATE = {
    switch: false,
    result: null,
    userWord: "",
    word: {
        en: "",
        fr: ""
    }
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

export const newWord = (words) => {
    let array = Object.keys(words)
    let word = {}

    if (array && array.length) {
        let min = Math.ceil(0)
        let max = Math.floor(array.length - 1)
        let random = Math.floor(Math.random() * (max - min + 1)) + min
        
        word = words[array[random]]
    }

    return {
        type: WORD_NEW,
        payload: word
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
                result: action.payload,
                userWord: ""
            })
        case WORD_NEW:
            return Object.assign({}, state, {
                word: action.payload
            })
        default:
            return state
    }
}
