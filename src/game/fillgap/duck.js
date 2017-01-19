const HELP = "old_wood/game/HELP"
const WORD_COUNT_ADD = "old_wood/game/WORD_COUNT::ADD"
const WORD_COUNT_LESS = "old_wood/game/WORD_COUNT::LESS"

const INITIAL_STATE = {
    wordcount: 0
}

export const help = i => {
    return {
        type: HELP,
        payload: i
    }
}

export const wordCountAdd = wordcount => {
    return {
        type: WORD_COUNT_ADD,
        payload: wordcount + 1
    }
}

export const wordCountLess = wordcount => {
    return {
        type: WORD_COUNT_LESS,
        payload: wordcount - 1
    }
}

export default function fillgapReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case HELP:
            return Object.assign({}, state, {})
        case WORD_COUNT_ADD:
            return Object.assign({}, state, {
                wordcount: action.payload
            })
        case WORD_COUNT_LESS:
            return Object.assign({}, state, {
                wordcount: action.payload
            })
        default:
            return state
    }
}
