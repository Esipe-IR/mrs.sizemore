import axios from 'axios'
import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'
import * as qs from 'qs'

const API_URL = "https://cas-auth-provider.herokuapp.com/"
const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas/cas.php"

export const auth = (username, password) => {
    var data = qs.stringify({
        username: username,
        password: password
    })

    return Observable.from(axios({
        url: API_URL,
        method: "POST",
        data: data,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }))
    .map(response => response.data)
}

export const checkAuth = (ticket) => {
    return Observable.from(fetchJsonp(CAS_URL))
    .flatMap(response => response.json())
    .map(response => JSON.parse(response))
}
