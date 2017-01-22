import { getWorksheets } from '../services/firebase'
import { loadingState } from '../app/duck'

const RECEIVE_WORKSHEETS = "old_wood/home/RECEIVE::WORKSHEETS"
const INITIAL_STATE = {
    worksheets: []
}

export const receiveWorksheets = (worksheets, err) => {
    return {
        type: RECEIVE_WORKSHEETS,
        payload: worksheets,
        error: err
    }
}

export const fetchWorksheets = () => (dispatch) => {
    return getWorksheets()
    .then(response => {
        dispatch(receiveWorksheets(response, false))
        dispatch(loadingState(false))
    })
    .catch(err => {
        dispatch(receiveWorksheets(err, true))
        dispatch(loadingState(false))
    })
}

export default function homeReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case RECEIVE_WORKSHEETS:
            return Object.assign({}, state, {
                worksheets: action.payload
            })
        default:
            return state
    }
}
