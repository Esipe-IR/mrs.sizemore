import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'

const SERVICE_UID = "{uid}"//"https://cas-auth-provider.herokuapp.com/"
const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas/api/service/call"

export const checkAuth = () => {
    var url = CAS_URL + "/" + API_URL;

    return Observable.from(fetchJsonp(url))
    .flatMap(response => response.json())
    .map(response => JSON.parse(response))
}
