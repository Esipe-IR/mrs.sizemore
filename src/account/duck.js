import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { addNotification as notify } from 'reapop';
import { updateLoading, notifError } from '../app/duck'
import { connexionToken } from '../firebase/duck'
import { checkAuth, CAS_URL, CAS_AUTH } from '../services/api/cas-auth'
import { PopupCenter } from '../services/popup'

const UPDATE_ACTION = "mrs.sizemore/account/UPDATE::ACTION"
const UPDATE_ERROR = "mrs.sizemore/account/UPDATE::ERROR"

const INITIAL_STATE = Map({
    action: false
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateError = createAction(UPDATE_ERROR)

export const errorNotConnected = (dispatch) => {
    dispatch(notify({
        title: "Not connected",
        message: "You must be connected to UPEM. Please connect.",
        dismissible: false,
        dismissAfter: 0,
        status: "error",
        buttons:[{
            name: "Connect",
            primary: true,
            onClick: () => PopupCenter(CAS_URL + CAS_AUTH, "Connect", 700, 400)
        }]
    }))
}

export const errorNotAllowed = (dispatch) => {
    dispatch(notify({
        title: "Not allowed",
        message: "You must allowed this app to connect to UPEM. Please allowed",
        dismissible: false,
        dismissAfter: 0,
        status: "error",
        buttons:[{
            name: "Allowed",
            primary: true,
            onClick: () => PopupCenter(CAS_URL, "Allowed Service", 700, 400)
        }]
    }))
}

export const connectUPEM = () => (dispatch) => {
    dispatch(updateLoading(true))

    checkAuth()
    .subscribe(data => {
        if (!data.status && data.code === 1) {
            return errorNotConnected(dispatch)
        }

        if (!data.status && data.code === 3) {
            return errorNotAllowed(dispatch)
        }

        if (data.status) {
            var d = JSON.parse(data.data)
            var token = d.token

            dispatch(connexionToken(token))
        }
    },
    err => dispatch(notifError(err.toString())),
    complete => dispatch(updateLoading(false)))
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_ERROR]: (state, action) => state.set("error", action.payload)
}, INITIAL_STATE)
