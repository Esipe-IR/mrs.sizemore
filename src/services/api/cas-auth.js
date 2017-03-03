import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'

const API_URL = "https://cas-auth-provider.herokuapp.com/"
const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas/"

export const CAS_URL_FORCE = CAS_URL + "?force=true"
export const CAS_URL_ALLOW = CAS_URL + "allow.php?service=" + API_URL

export const checkAuth = (ticket) => {
    var url = CAS_URL + "?service=" + API_URL;

    return Observable.from(fetchJsonp(url))
    .flatMap(response => response.json())
    .map(response => JSON.parse(response))
}
