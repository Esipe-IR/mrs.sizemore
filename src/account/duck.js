import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { updateLoading, notifError } from '../app/duck'
import { connexionToken } from '../firebase/duck'
import { getFirebaseToken } from '../services/api/casToFirebase'
import CASEnablerSDK from '../services/CASEnabler-SDK/sdk.es6'
import { logEvent } from '../services/analytics'

const UPDATE_ACTION = "mrs.sizemore/account/UPDATE::ACTION"
const UPDATE_ERROR = "mrs.sizemore/account/UPDATE::ERROR"

const INITIAL_STATE = Map({
    action: false
})

export const updateAction = createAction(UPDATE_ACTION)
export const updateError = createAction(UPDATE_ERROR)

export const connectUPEM = () => (dispatch) => {
    logEvent("connexionUPEM")

    let config = {
        publicUid: "440adfa5-5d8f-4f75-915f-47afb7527dc7"
    };

    let sdk = new CASEnablerSDK(config)
    sdk.connect(function(casToken, error) {
        if (error !== null) {
            return dispatch(notifError(error))
        }

        dispatch(updateLoading(true))

        getFirebaseToken(casToken).subscribe(
            res => dispatch(connexionToken(res.data)),
            err => dispatch(notifError(err.toString())),
            complete => dispatch(updateLoading(false))
        )
    })
}

export default handleActions({
    [UPDATE_ACTION]: (state, action) => state.set("action", action.payload),
    [UPDATE_ERROR]: (state, action) => state.set("error", action.payload)
}, INITIAL_STATE)
