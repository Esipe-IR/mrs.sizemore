import { getWorksheet } from '../services/firebase'

const MODE_CHANGE = "old_wood/game/MODE::CHANGE"
const RECEIVE_WORKSHEET = "old_wood/game/RECEIVE::WORKSHEET"

const INITIAL_STATE = {
    mode: "easy",
    worksheet: {},
    error: false
}

export const changeMode = mode => {
    return {
        type: MODE_CHANGE,
        payload: mode
    }
}

export const receiveWorksheet = (worksheet, err) => {
    return {
        type: RECEIVE_WORKSHEET,
        payload: worksheet,
        error: err
    }
}

export const fetchWorksheet = (sheet) => (dispatch) => {
    return getWorksheet(sheet)
    .then(response => {
        dispatch(receiveWorksheet(response, false))
    })
    .catch(err => {
        dispatch(receiveWorksheet(err, true))
    })
}

export default function gameReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case MODE_CHANGE:
            return Object.assign({}, state, {
                mode: action.payload
            })
        case RECEIVE_WORKSHEET:
            return Object.assign({}, state, {
                worksheet: action.payload,
                error: action.error
            })
        default:
            return state
    }
}
