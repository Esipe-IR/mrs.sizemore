import API from '../services/api'
import { 
    HELP, 
    WORD_COUNT_ADD, 
    WORD_COUNT_LESS, 
    REQUEST, 
    RECEIVE_SUCCESS,
    RECEIVE_FAILED } from '../constants'

export const help = (i) => {
    return {
        type: HELP,
        number: i
    }
}

export const wordCountAdd = () => {
    return {
        type: WORD_COUNT_ADD
    }
}

export const wordCountLess = () => {
    return {
        type: WORD_COUNT_LESS
    }
}

const request = (theme, worksheet) => {
    return {
        type: REQUEST,
        theme: theme,
        worksheet: worksheet
    }
}

const receiveSuccess = (json) => {
    json = JSON.parse(json)

    return {
        type: RECEIVE_SUCCESS,
        words: json.words,
        definitions: json.definitions,
        examples: json.examples
    }
}

const receiveFailed = (error) => {
    return {
        type: RECEIVE_FAILED,
        error: error
    }
}

export const fetchQuizz = (sheet) => (dispatch) => {
    dispatch(request("school", sheet));

    return API().Play(sheet)
    .then(response => {
        dispatch(receiveSuccess(response))
    })
    .catch((err) => {
        dispatch(receiveFailed(err.message))
    })
}
