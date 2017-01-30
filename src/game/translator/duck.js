const INPUT_CHANGE = "old_wood/translator/INPUT::CHANGE"
const WORD_NEW = "old_wood/translator/WORD::NEW"
const WORD_RESULT = "old_wood/translator/WORD::RESULT"

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

export const wordNew = (words) => {
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

export const wordResult = (word, userWord) => {
    let status = false
    let msg = "Wrong! The correct answer for '" + word.fr + "' is: '" + word.en + "' not: '" + userWord + "'"

    if (userWord === word.en) {
        status = true
        msg = "Great job!"
    }

    return {
        type: WORD_RESULT,
        payload: msg,
        status: status
    }
}

export default function translatorReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case INPUT_CHANGE:
            return Object.assign({}, state, {
                userWord: action.payload
            })
        case WORD_RESULT:
            return Object.assign({}, state, {
                result: action.status,
                resultMsg: action.payload,
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
