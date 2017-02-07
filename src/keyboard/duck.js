import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const UPDATE_STATUS = "old_wood/keyboard/UPDATE::STATUS"

const INITIAL_STATE = Map({
    status: false
})

export const updateStatus = createAction(UPDATE_STATUS)

export default handleActions({
    [UPDATE_STATUS]: (state, action) => state.set("status", action.payload),
}, INITIAL_STATE)
