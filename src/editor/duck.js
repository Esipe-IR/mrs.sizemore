import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const INITIAL_STATE = Map({
    del: []
})

const UPDATE_DELETE = "old_wood/editor/UPDATE::DELETE"

export const updateDelete = createAction(UPDATE_DELETE)

export default handleActions({
    [UPDATE_DELETE]: (state, action) => state.set("delete", action.payload)
}, INITIAL_STATE)
