import fetchJsonp from 'fetch-jsonp'
import { Observable } from 'rxjs'

const SERVICE_UID = "acf2feb0-05a4-11e7-93ae-92361f002671"

export const CAS_URL = "https://perso-etudiant.u-pem.fr/~vrasquie/cas"
export const CAS_API = "/api/service/call"
export const CAS_AUTH = "/auth";

export const checkAuth = () => {
    var url = CAS_URL + CAS_API + "/" + SERVICE_UID;

    return Observable.from(fetchJsonp(url))
    .flatMap(response => response.json())
}
