import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_WORD = "old_wood/translator/UPDATE::WORD"
const UPDATE_INPUT = "old_wood/translator/UPDATE::INPUT"
const UPDATE_RESULT = "old_wood/translator/UPDATE::RESULT"
const UPDATE_SCORE = "old_wood/translator/UPDATE::SCORE"

const INITIAL_STATE = Map({
    input: "",
    score: 0
})

export const updateWord = createAction(UPDATE_WORD)
export const updateInput = createAction(UPDATE_INPUT)
export const updateResult = createAction(UPDATE_RESULT, (status, msg, extra) => ({
    msg,
    status,
    extra
}))
export const updateScore = createAction(UPDATE_SCORE)

export default handleActions({
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload),
    [UPDATE_INPUT]: (state, action) => state.set("input", action.payload), 
    [UPDATE_RESULT]: (state, action) => (state.withMutations(ctx => { 
        ctx
        .set("result", action.payload.status)
        .set("resultMsg", action.payload.msg)
        .set("resultExtra", action.payload.extra)
        .set("input", "")
    })),
    [UPDATE_SCORE]: (state, action) => state.set("score", action.payload)
}, INITIAL_STATE)
