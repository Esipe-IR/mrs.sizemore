import axios from 'axios'
import { Observable } from 'rxjs'

const URL = "https://mrs-sizemore-auth.herokuapp.com";

export const getFirebaseToken = (token) => {
    return Observable.from(
        axios.get(URL, {
            params: {
                token: token
            }
        })
    )
}
