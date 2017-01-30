import { update, create, getCompleteWorksheet, getWord } from '../services/firebase'
import { loadingState } from '../app/duck'
import { addKey, editKey, deleteKey } from '../services/obj'

const INIT = "old_wood/editor/INIT"
const FULL_UPDATE = "old_wood/editor/FULL::UPDATE"
const WORKSHEET_UPDATE = "old_wood/editor/WORKSHEET::UPDATE"
const WORDS_UPDATE = "old_wood/editor/WORDS::UPDATE"
const WORD_UPDATE = "old_wood/editor/WORD::UPDATE"
const ADD_WORD = "old_wood/editor/ADD::WORD"
const RECEIVE_SUCCESS = "old_wood/editor/RECEIVE::SUCCESS"
const RECEIVE_ERROR = "old_wood/editor/RECEIVE::ERROR"

const INITIAL_STATE = {
    worksheet: {
        state: false,
        name: "",
        img: "",
        description: "",
    },
    words: [],
    word: {
        en: "",
        fr: "",
        definition: "",
        examples: []
    },
    error: null,
    errorMsg: ""
}

export const receiveSuccess = (msg) => {
    return {
        type: RECEIVE_SUCCESS,
        payload: msg
    }
}

export const receiveError = (err) => {
    return {
        type: RECEIVE_ERROR,
        payload: err
    }
}

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

export const saveChild = (id, data) => (dispatch) => {
    update(id, data)
    .then(response => {
        dispatch(receiveSuccess("Well update!"))
    })
    .catch(error => {
        dispatch(receiveError(error))
    })
}

export const addWord = (word) => {
    return {
        type: ADD_WORD,
        payload: word
    }
}

export const createWord = (worksheet, word) => (dispatch) => {
    word.worksheet = worksheet

    create('words', word)
    .then(result => dispatch(addWord(word)))
    .catch(err => dispatch(receiveError(err)))
}

export const init = (data) => {
    let payload = {
        worksheet: data.worksheet,
        words: []
    }

    let array = Object.keys(data.words)

    array.forEach(w => {
        payload.words.push(data.words[w])
    })

    return {
        type: INIT,
        payload: payload
    }
}

export const updateWorksheet = (data) => {
    return {
        type: WORKSHEET_UPDATE,
        payload: data
    }
}

export const updateWords = (data) => {
    return {
        type: WORDS_UPDATE,
        payload: data
    }
}

export const updateWord = (data) => {
    return {
        type: WORD_UPDATE,
        payload: data
    }
}

export const fetchWorksheet = (sheet) => (dispatch) => {
    getCompleteWorksheet(sheet)
    .then(response => {
        dispatch(init(response))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(receiveError(err))
        dispatch(loadingState(false))
    })
}

export const fetchWord = (id) => (dispatch) => {
    getWord(id)
    .then(response => {
        dispatch(updateWord(response))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(receiveError(err))
        dispatch(loadingState(false))
    })
}

export default function editorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INIT:
            return Object.assign({}, state, {
                worksheet: action.payload.worksheet,
                words: action.payload.words
            })
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
        case RECEIVE_SUCCESS:
            return Object.assign({}, state, {
                error: false,
                errorMsg: action.payload
            })
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                error: true,
                errorMsg: action.payload
            })
        default:
            return state
    }
}

