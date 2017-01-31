import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { getFingerPrint } from '../services/fingerprint'
import { getCurrentUser, getWorksheets, getCompleteWorksheet } from '../services/firebase'

const UPDATE_ERROR = "old_wood/app/UPDATE::ERROR"
const UPDATE_USER = "old_wood/app/UPDATE::USER"
const UPDATE_FINGERPRINT = "old_wood/app/UPDATE::FINGERPRINT"
const UPDATE_LOADING = "old_wood/app/UPDATE::LOADING"
const UPDATE_WORKSHEETS = "old_wood/app/UPDATE::WORKSHEETS"
const UPDATE_WORKSHEET = "old_wood/app/UPDATE::WORKSHEET"

const INITIAL_STATE = Map({
    error: null, 
    user: null, 
    fingerprint: null,
    loading: true,
    worksheets: null
})

export const updateError = createAction(UPDATE_ERROR)
export const updateUser = createAction(UPDATE_USER)
export const updateFingerprint = createAction(UPDATE_FINGERPRINT)
export const updateLoading = createAction(UPDATE_LOADING)
export const updateWorksheets = createAction(UPDATE_WORKSHEETS)
export const updateWorksheet = createAction(UPDATE_WORKSHEET)

export const fetchFingerprint = () => (dispatch) => {
    getFingerPrint()
    .then(result => dispatch(updateFingerprint(result)))
}

export const fetchUser = () => (dispatch) => {
    getCurrentUser()
    .then(u => dispatch(updateUser(u)))
}

export const fetchWorksheet = (id) => (dispatch) => {
    dispatch(updateLoading(true))

    getCompleteWorksheet(id)
    .then(response => {
        dispatch(updateWorksheet(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(err))
        dispatch(updateLoading(false))
    })
}

export const fetchWorksheets = () => (dispatch) => {
    dispatch(updateLoading(true))
    
    getWorksheets()
    .then(response => {
        dispatch(updateWorksheets(response))
        dispatch(updateLoading(false))
    })
    .catch(err => {
        dispatch(updateError(true, err))
        dispatch(updateLoading(false))
    })
}

export default handleActions({
    [updateError]: (state, action) => (state.withMutations((ctx) => {
        ctx.set("error", action.error).set("errorMsg", action.payload.message)
    })),
    [updateUser]: (state, action) => state.set("user", action.payload),
    [updateFingerprint]: (state, action) => state.set("fingerprint", action.payload),
    [updateLoading]: (state, action) => state.set("loading", action.payload),
    [updateWorksheets]: (state, action) => state.set("worksheets", action.payload),
    [updateWorksheet]: (state, action) => state.set("worksheet", action.payload)
}, INITIAL_STATE)
