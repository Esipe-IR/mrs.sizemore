import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { logEvent } from '../services/analytics'

const UPDATE_MODE = "mrs.sizemore/game/UPDATE::MODE"

const INITIAL_STATE = Map({
    mode: 0
})

export const updateMode = (mode) => {
    logEvent("gameChangeMode", mode)

    let a = createAction(UPDATE_MODE)
    return a(mode)
}

export default handleActions({
    [UPDATE_MODE]: (state, action) => state.set("mode", action.payload)
}, INITIAL_STATE)
