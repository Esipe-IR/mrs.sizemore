import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { formValueSelector } from 'redux-form'
import { updateLoading, updateError } from '../app/duck'
import { getDefinitions, getExamples } from '../services/client'

const INITIAL_STATE = Map({
    del: []
})

const UPDATE_DELETE = "old_wood/editor/UPDATE::DELETE"
const UPDATE_TIPS = "old_wood/editor/UPDATE::TIPS"

export const updateDelete = createAction(UPDATE_DELETE)
export const updateTips = createAction(UPDATE_TIPS)

export const fetchDefinitions = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    getDefinitions(word)
    .then(response =>  {
        let tips = Map({
            show: true,
            body: response.data,
            type: 0
        })

        dispatch(updateTips(tips))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(updateLoading(false))
    })
}

export const fetchSentences = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    getExamples(word)
    .then(response => {
        let tips = Map({
            show: true,
            body: response.data.examples,
            type: 1
        })

        dispatch(updateTips(tips))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(updateLoading(false))
    })
}

export const wordSelector = formValueSelector("word_editor")

export default handleActions({
    [UPDATE_DELETE]: (state, action) => state.set("delete", action.payload),
    [UPDATE_TIPS]: (state, action) => state.set("tips", action.payload)
}, INITIAL_STATE)
