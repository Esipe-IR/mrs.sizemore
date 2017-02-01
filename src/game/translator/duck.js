import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_WORD = "old_wood/translator/UPDATE::WORD"
const UPDATE_INPUT = "old_wood/translator/UPDATE::INPUT"
const UPDATE_RESULT = "old_wood/translator/UPDATE::RESULT"

const INITIAL_STATE = Map({
    input: ""
})

export const updateWord = createAction(UPDATE_WORD)
export const updateInput = createAction(UPDATE_INPUT)
export const updateResult = createAction(UPDATE_RESULT, (status, msg) => ({
    msg,
    status
}))

export default handleActions({
    [updateWord]: (state, action) => state.set("word", action.payload),
    [updateInput]: (state, action) => state.set("input", action.payload), 
    [updateResult]: (state, action) => (state.withMutations(ctx => { 
        ctx.set("result", action.payload.status).set("resultMsg", action.payload.msg).set("input", "")
    }))
}, INITIAL_STATE)
