import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import { createSelector } from 'reselect'
import { logEvent } from '../../services/analytics'

const UPDATE_USERWORDS = "mrs.sizemore/fillgap/UPDATE::USERWORDS"
const UPDATE_SCORE = "mrs.sizemore/fillgap/UPDATE::SCORE"
const UPDATE_DIFFICULTY = "mrs.sizemore/fillgap/UPDATE::DIFFICULTY"

const INITIAL_STATE = Map({
    userWords: List(),
    difficulty: 0,
    score: 0
})

export const updateUserWords = createAction(UPDATE_USERWORDS)
export const updateDifficulty = (d) => {
    logEvent("fillgapChangeDifficulty", d)

    let a = createAction(UPDATE_DIFFICULTY)
    return a(d)
}
export const updateScore = createAction(UPDATE_SCORE)

const getUserWords = (fillgapReducer) => fillgapReducer.get("userWords")
export const getUserCount = createSelector(
    [getUserWords],
    (words) => {
        let count = 0

        words.forEach((w, i) => {
            if (w.get("value") !== "---" && w.get("value") !== "") count++
        })

        return count
    }
)

export default handleActions({
    [UPDATE_USERWORDS]: (state, action) => state.set("userWords", action.payload),
    [UPDATE_DIFFICULTY]: (state, action) => state.set("difficulty", action.payload),
    [UPDATE_SCORE]: (state, action) => state.set("score", action.payload)
}, INITIAL_STATE)
