import { getWorksheets, getWorksheet } from '../services/firebase'
import { 
    HELP, 
    WORD_COUNT_ADD, 
    WORD_COUNT_LESS,
    TRANSLATE_ANSWER, 
    RECEIVE_FIREBASE 
} from '../constants'

export const help = (i) => {
    return {
        type: HELP,
        number: i
    }
}

export const translateAnswer = (status, msg, word_id) => {
    return {
        type: TRANSLATE_ANSWER,
        payload: {
            status: status,
            word_id: word_id,
            msg: msg
        }
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

const receiveFirebase = (data) => {
    return {
        type: RECEIVE_FIREBASE,
        payload: data
    }
}

export const fetchWorksheet = (sheet) => (dispatch) => {
    return getWorksheet(sheet)
    .then(response => {
        dispatch(receiveFirebase(response))
    })
    .catch(err => {
        dispatch(receiveFirebase({}))
    })
}

export const fetchWorksheets = () => (dispatch) => {
    return getWorksheets()
    .then(response => {
        dispatch(receiveFirebase(response))
    })
    .catch(err => {
        dispatch(receiveFirebase([]))
    })
}
