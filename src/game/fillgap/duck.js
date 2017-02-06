import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

const UPDATE_USERWORDS = "old_wood/fillgap/UPDATE::USERWORDS"
const HELP = "old_wood/game/HELP"

const INITIAL_STATE = Map({
    userWords: List()
})

export function randomizeWords(words) {
    return words
}

export function getFullCount(words) {
    let count = 0

    for (let i = 0; i < words.size; i++) {
        if (words.get(i).get("examples") && words.get(i).get("examples").size) {
            count++
        }
    }

    console.log(count)

    return count
}

export const updateUserWords = createAction(UPDATE_USERWORDS)

export const help = i => {
    return {
        type: HELP,
        payload: i
    }
}

export default handleActions({
    [UPDATE_USERWORDS]: (state, action) => state.set("userWords", action.payload)
}, INITIAL_STATE)
