import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { update, create, getWord } from '../services/firebase'
import { updateError, updateSuccess } from '../app/duck'

const UPDATE_WORD = "old_wood/editor/UPDATE::WORD"
const ADD_WORD = "old_wood/editor/ADD::WORD"

const INITIAL_STATE = Map({
    word: Map({
        en: "",
        fr: "",
        definition: ""
    })
})

export const addWord = createAction(ADD_WORD)
export const updateWord = createAction(UPDATE_WORD)

export const updateChild = (id, data) => (dispatch) => {
    update(id, data)
    .then(response => dispatch(updateSuccess("Successfully update!")))
    .catch(error => dispatch(updateError(error)))
}

export const createWord = (word) => (dispatch) => {
    create('words', word)
    .then(result => {
        dispatch(addWord(word))
        dispatch(updateSuccess("Successfully create!"))
    })
    .catch(err => dispatch(updateError(err)))
}

export const fetchWord = (id) => (dispatch) => {
    getWord(id)
    .then(result => dispatch(updateWord(result)))
    .catch(err => dispatch(updateError(err)))
}

export default handleActions({
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload)
}, INITIAL_STATE)
