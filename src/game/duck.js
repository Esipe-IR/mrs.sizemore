import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_MODE = "old_wood/game/UPDATE::MODE"
const UPDATE_SCORE = "old_wood/game/UPDATE::SCORE"

const INITIAL_STATE = Map({
    mode: 0,
    score: 0
})

export const updateMode = createAction(UPDATE_MODE)
export const updateScore = createAction(UPDATE_SCORE)

export default handleActions({
    [UPDATE_MODE]: (state, action) => state.set("mode", action.payload),
    [UPDATE_SCORE]: (state, action) => state.set("score", action.payload)
}, INITIAL_STATE)
