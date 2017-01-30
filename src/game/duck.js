import { getCompleteWorksheet } from '../services/firebase'
import { loadingState, loadingError } from '../app/duck'
import { push } from 'react-router-redux'

const MODE_CHANGE = "old_wood/game/MODE::CHANGE"
const RECEIVE_WORKSHEET = "old_wood/game/RECEIVE::WORKSHEET"

const INITIAL_STATE = {
    mode: 0,
    worksheet: {
        state: false,
        name: "",
        img: "",
        description: "",
    },
    words: {},
    answer: []
}

export const changeMode = mode => {
    return {
        type: MODE_CHANGE,
        payload: mode
    }
}

export const receiveWorksheet = (worksheet) => {
    return {
        type: RECEIVE_WORKSHEET,
        payload: worksheet
    }
}

export const fetchWorksheet = (id) => (dispatch) => {
    getCompleteWorksheet(id)
    .then(response => {
        dispatch(receiveWorksheet(response, false))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(dispatch(push('/')))
        dispatch(loadingError(true, err))
        dispatch(loadingState(false))
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
                worksheet: action.payload.worksheet,
                words: action.payload.words
            })
        default:
            return state
    }
}
