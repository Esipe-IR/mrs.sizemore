import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { update, create } from '../services/firebase'
import { updateError, updateSuccess } from '../app/duck'
import { addKey, editKey, deleteKey } from '../services/obj'

const FULL_UPDATE = "old_wood/editor/FULL::UPDATE"
const WORDS_UPDATE = "old_wood/editor/WORDS::UPDATE"
const WORD_UPDATE = "old_wood/editor/WORD::UPDATE"
const ADD_WORD = "old_wood/editor/ADD::WORD"

const INITIAL_STATE = Map({})

export const addChild = (name, child, former) => {
    let last = addKey(name.split("/"), child, former)

    return {
        type: FULL_UPDATE,
        payload: last
    }
}

export const editChild = (name, value, former) => {
    let last = editKey(name.split("/"), value, former)

    return {
        type: FULL_UPDATE,
        payload: last
    }
}

export const deleteChild = (name, former) => {
    let last = deleteKey(name.split("/"), former)

    return {
        type: FULL_UPDATE,
        payload: last
    }
}

export const updateChild = (id, data) => (dispatch) => {
    update(id, data)
    .then(response => dispatch(updateSuccess("Successfully update!")))
    .catch(error => dispatch(updateError(error)))
}

export const addWord = (word) => {
    return {
        type: ADD_WORD,
        payload: word
    }
}

export const createWord = (word) => (dispatch) => {
    create('words', word)
    .then(result => {
        dispatch(addWord(word))
        dispatch(updateSuccess("Successfully create!"))
    })
    .catch(err => dispatch(updateError(err)))
}

export const init = (data) => {
    let payload = {
        worksheet: data.worksheet,
        words: [],
        word: INITIAL_STATE.word
    }

    let array = Object.keys(data.words)

    array.forEach(w => {
        payload.words.push(data.words[w])
    })

    return {
        type: FULL_UPDATE,
        payload: payload
    }
}

export const updateWords = (data) => {
    return {
        type: WORDS_UPDATE,
        payload: data
    }
}

export default function editorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FULL_UPDATE:
            return Object.assign({}, state, {
                worksheet: action.payload.worksheet,
                words: action.payload.words,
                word: action.payload.word
            })
        case ADD_WORD:
            return Object.assign({}, state, {
                words: [...state.words, action.payload],
                word: INITIAL_STATE.word
            })
        case WORD_UPDATE:
            return Object.assign({}, state, {
                word: action.payload
            })
        default:
            return state
    }
}

