import { saveWorksheet, getCompleteWorksheet } from '../services/firebase'
import { loadingState } from '../app/duck'

const WORKSHEET_UPDATE = "old_wood/editor/WORKSHEET::UPDATE"
const RECEIVE_ERROR = "old_wood/editor/RECEIVE::ERROR"

const INITIAL_STATE = {
    worksheet: {
        state: false,
        name: "",
        img: "",
        description: "",
    },
    words: [],
    error: false
}

export const changeInput = (data, value, state) => {
    let worksheet = Object.assign({}, state)
    worksheet[data] = value

    return {
        type: WORKSHEET_UPDATE,
        payload: worksheet
    }
}

export const updateWorksheet = (data) => {
    let payload = {
        worksheet: data.worksheet,
        words: []
    }

    let array = Object.keys(data.words)

    array.forEach(w => {
        payload.words.push(data.words[w])
    })

    return {
        type: WORKSHEET_UPDATE,
        payload: payload
    }
}

export const receiveError = (err) => {
    console.log(err)
    
    return {
        type: RECEIVE_ERROR,
        payload: err
    }
}

export const saveInput = (sheet) => (dispatch) => {
    return saveWorksheet(sheet)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

export const fetchWorksheet = (sheet) => (dispatch) => {
    return getCompleteWorksheet(sheet)
    .then(response => {
        dispatch(updateWorksheet(response))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(receiveError(err))
        dispatch(loadingState(false))
    })
}

export default function editorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WORKSHEET_UPDATE:
            return Object.assign({}, state, {
                worksheet: action.payload.worksheet,
                words: action.payload.words,
                error: action.error
            })
        default:
            return state
    }
}

