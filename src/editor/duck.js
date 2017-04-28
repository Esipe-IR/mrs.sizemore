import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { formValueSelector } from 'redux-form'
import { updateWorksheet, updateWord } from '../firebase/duck'
import { updateLoading, notifError } from '../app/duck'
import { getDefinitions, getExamples } from '../services/api/wordnik'
import { logEvent } from '../services/analytics'

const INITIAL_STATE = Map({
    page: 0
})

const UPDATE_TIPS = "mrs.sizemore/editor/UPDATE::TIPS"
const UPDATE_PAGE = "mrs.sizemore/editor/UPDATE::PAGE"

export const updateTips = createAction(UPDATE_TIPS)
export const updatePage = createAction(UPDATE_PAGE)

export const fetchDefinitions = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    logEvent("apiWordnikFetchDef", null, word)

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
        dispatch(notifError(err.toString()))
        dispatch(updateLoading(false))
    })
}

export const fetchSentences = (word) => (dispatch) => {
    dispatch(updateLoading(true))

    logEvent("apiWordnikFetchSen", null, word)

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
        dispatch(notifError(err.toString()))
        dispatch(updateLoading(false))
    })
}

export const wordSelector = formValueSelector("word_editor")

export default handleActions({
    [UPDATE_TIPS]: (state, action) => state.set("tips", action.payload),
    [UPDATE_PAGE]: (state, action) => state.set("page", action.payload),
    [updateWorksheet]: (state, action) => state.set("worksheet", action.payload),
    [updateWord]: (state, action) => state.set("word", action.payload)
}, INITIAL_STATE)
