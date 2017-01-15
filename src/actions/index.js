import API from '../services/api'
import { HELP, REQUEST, RECEIVE } from '../constants'

export const help = (i) => {
    return {
        type: HELP,
        number: i
    }
}

const request = () => {
    return {
        type: REQUEST
    }
}

const receive = (error, payload) => {
    return {
        type: RECEIVE,
        error: error,
        payload: payload
    }
}

export const fetchQuizz = () => (dispatch) => {
    dispatch(request());

    return API().Play()
    .then(response => {
        dispatch(receive(false, response))
    })
    .catch((err) => {
        dispatch(receive(true, err.message))
    })
}
