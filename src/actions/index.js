import { apiCall } from '../services/api'
import {REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILED} from '../constants'

const request = () => {
    return {
        type: REQUEST
    }
}

const receiveSuccess = (json) => {
    return {
        type: RECEIVE_SUCCESS,
        json: json
    }
}

const receiveFailed = (err) => {
    return {
        type: RECEIVE_FAILED,
        err: err
    }
}

export const fetchQuizz = (word) => (dispatch) => {
    dispatch(request());

    return apiCall(word)
    .then(response => {
        dispatch(receiveSuccess(response))
    })
    .catch((err) => {
        dispatch(receiveFailed(err.message))
    })
}
