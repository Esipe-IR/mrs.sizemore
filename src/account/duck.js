import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { addNotification as notify } from 'reapop';
import { updateLoading, notifError } from '../app/duck'
import { connexionToken } from '../firebase/duck'
import { checkAuth, CAS_URL_ALLOW, CAS_URL_FORCE } from '../services/api/cas-auth'

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
            onClick: () => {
                window.open(
                    CAS_URL_FORCE,
                    "_blank", 
                    "toolbar=yes,scrollbars=yes,resizable=yes,width=700,height=700"
                );
            }
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
            onClick: () => {
                window.open(
                    CAS_URL_ALLOW, 
                    "_blank",
                    "toolbar=yes,scrollbars=yes,resizable=yes,width=700,height=700"
                );
            }
        }]
    }))
}

export const connectUPEM = () => (dispatch) => {
    dispatch(updateLoading(true))

    checkAuth()
    .catch(err => dispatch(notifError(err.toString())))
    .subscribe(data => {
        dispatch(updateLoading(false))

        if (!data.status && data.code === 1) {
            return errorNotConnected(dispatch)
        }

        if (!data.status && data.code === 3) {
            return errorNotAllowed(dispatch)
        }

        dispatch(connexionToken(data.token))
    })
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_ERROR]: (state, action) => state.set("error", action.payload)
}, INITIAL_STATE)
