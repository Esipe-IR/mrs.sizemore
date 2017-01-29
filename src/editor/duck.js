import { update, getCompleteWorksheet, getWord } from '../services/firebase'
import { loadingState } from '../app/duck'
import { addKey, editKey, deleteKey } from '../services/obj'

const INIT = "old_wood/editor/INIT"
export const WORKSHEET_UPDATE = "old_wood/editor/WORKSHEET::UPDATE"
export const WORDS_UPDATE = "old_wood/editor/WORDS::UPDATE"
export const WORD_UPDATE = "old_wood/editor/WORD::UPDATE"
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
    error: false
}

export const addChild = (name, child, former, type) => {
    let newObj = addKey(name.split("/"), child, former)

    return {
        type: type,
        payload: newObj
    }
}

export const editChild = (name, value, former, type) => {
    let newObj = editKey(name.split("/"), value, former)

    return {
        type: type,
        payload: newObj
    }
}

export const deleteChild = (name, former, type) => {
    let newObj = deleteKey(name.split("/"), former)

    return {
        type: type,
        payload: newObj
    }
}

export const saveChild = (id, data) => (dispatch) => {
    return update(id, data)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
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

export const receiveError = (err) => {
    console.log(err)

    return {
        type: RECEIVE_ERROR,
        payload: err
    }
}

export const fetchWorksheet = (sheet) => (dispatch) => {
    return getCompleteWorksheet(sheet)
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
    return getWord(id)
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
        case WORKSHEET_UPDATE:
            return Object.assign({}, state, {
                worksheet: action.payload,
            })
        case WORDS_UPDATE:
            return Object.assign({}, state, {
                words: action.payload
            })
        case WORD_UPDATE:
            return Object.assign({}, state, {
                word: action.payload
            })
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        default:
            return state
    }
}

