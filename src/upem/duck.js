import { notifLoading, notifError } from '../app/duck'
import { connexionToken } from '../firebase/duck'
import { auth } from '../services/api/cas-auth'

export const connexion = (user) => (dispatch) => {
    if (!user.username && !user.password) {
        dispatch(notifError("No information submit"))
        return
    }

    dispatch(notifLoading("Asking API"))

    auth(user.username, user.password)
    .subscribe(
        response => dispatch(connexionToken(response.token)),
        err => dispatch(notifError(err.toString()))
    )
}
