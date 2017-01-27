import { saveWorksheet, getWorksheet } from '../services/firebase'
import { loadingState } from '../app/duck'

const WORKSHEET_UPDATE = "old_wood/editor/WORKSHEET::UPDATE"

const INITIAL_STATE = {
    worksheet: {
        state: false,
        name: "",
        img: "",
        description: "",
    },
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

export const updateWorksheet = (worksheet, err) => {
    return {
        type: WORKSHEET_UPDATE,
        payload: worksheet,
        error: err
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
    return getWorksheet(sheet)
    .then(response => {
        dispatch(updateWorksheet(response, false))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(updateWorksheet(err, true))
        dispatch(loadingState(false))
    })
}

export default function editorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WORKSHEET_UPDATE:
            return Object.assign({}, state, {
                worksheet: action.payload,
                error: action.error
            })
        default:
            return state
    }
}

