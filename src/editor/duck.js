import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { updateError } from '../app/duck'
import { getDefinitions, getExamples } from '../services/client'

const INITIAL_STATE = Map({
    del: []
})

const UPDATE_DELETE = "old_wood/editor/UPDATE::DELETE"
const UPDATE_TIPS = "old_wood/editor/UPDATE::TIPS"

export const updateDelete = createAction(UPDATE_DELETE)
export const updateTips = createAction(UPDATE_TIPS)

export const fetchDefinitions = (word) => (dispatch) => {
    getDefinitions(word)
    .then(response =>  {
        console.log(response)
        updateTips(response)
    })
    .catch(err => {
        console.log(err)
        updateError(err)
    })
}

export const fetchExamples = (word) => (dispatch) => (
    getExamples(word)
    .then(response => updateTips(response))
    .catch(err => updateError(err))
)

export default handleActions({
    [UPDATE_DELETE]: (state, action) => state.set("delete", action.payload),
    [UPDATE_TIPS]: (state, action) => state.set("tips", action.payload)
}, INITIAL_STATE)
