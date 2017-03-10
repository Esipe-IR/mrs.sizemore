import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'

const SERVICE_UID = "acf2feb0-05a4-11e7-93ae-92361f002671"
const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas/api/service/call"

export const checkAuth = () => {
    var url = CAS_URL + "/" + SERVICE_UID;

    return Observable.from(fetchJsonp(url))
    .flatMap(response => {
        console.log(response)
        return response.json()})
    .map(response => JSON.parse(response))
}
