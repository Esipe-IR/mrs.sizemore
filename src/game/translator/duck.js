import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_WORD = "mrs.sizemore/translator/UPDATE::WORD"
const UPDATE_HISTORY = "mrs.sizemore/translator/UPDATE::HISTORY"
const UPDATE_INPUT = "mrs.sizemore/translator/UPDATE::INPUT"
const UPDATE_SCORE = "mrs.sizemore/translator/UPDATE::SCORE"

const INITIAL_STATE = Map({
    input: "",
    score: 0
})

export const updateWord = createAction(UPDATE_WORD)
export const updateHistory = createAction(UPDATE_HISTORY)
export const updateInput = createAction(UPDATE_INPUT)
export const updateScore = createAction(UPDATE_SCORE)

export default handleActions({
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload),
    [UPDATE_HISTORY]: (state, action) => state.set("history", action.payload),
    [UPDATE_INPUT]: (state, action) => state.set("input", action.payload),
    [UPDATE_SCORE]: (state, action) => state.set("score", action.payload)
}, INITIAL_STATE)
