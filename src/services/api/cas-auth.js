import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'

const API_URL = "https://cas-auth-provider.herokuapp.com/"
const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas/"

export const checkAuth = (ticket) => {
    var url = CAS_URL + "?service=" + API_URL;

    return Observable.from(fetchJsonp(url))
    .catch(err => console.log(err))
    .flatMap(response => {
        console.log(response)
        return response.json()
    })
    .map(response => JSON.parse(response))
}
