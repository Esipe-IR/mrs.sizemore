import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { notifError, updateLoading } from '../app/duck'
import { getWorksheets, getCompleteWorksheet, getWord } from '../services/firebase'

const INITIAL_STATE = Map({})

const UPDATE_WORKSHEETS = "mrs.sizemore/firebase/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "mrs.sizemore/firebase/UPDATE::WORKSHEET"
const UPDATE_WORD = "mrs.sizemore/firebase/UPDATE::WORD"

export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)
export const updateWord = createAction(UPDATE_WORD)

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .subscribe(
        response => dispatch(updateWorksheets(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .subscribe(
        response => dispatch(updateWorksheet(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export const fetchWord = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getWord(id)
    .subscribe(
        response => dispatch(updateWord(response)),
        err => dispatch(notifError(err.toString())),
        complete => dispatch(updateLoading(false))
    )
}

export default handleActions({
    [UPDATE_WORKSHEETS]: (state, action) => state.set("worksheets", action.payload),
    [UPDATE_WORKSHEET]: (state, action) => state.set("worksheet", action.payload),
    [UPDATE_WORD]: (state, action) => state.set("word", action.payload)
}, INITIAL_STATE)
