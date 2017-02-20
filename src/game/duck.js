import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_MODE = "mrs.sizemore/game/UPDATE::MODE"

const INITIAL_STATE = Map({
    mode: 0
})

export const updateMode = createAction(UPDATE_MODE)

export default handleActions({
    [UPDATE_MODE]: (state, action) => state.set("mode", action.payload)
}, INITIAL_STATE)
