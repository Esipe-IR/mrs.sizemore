import axios from 'axios'
import { Observable } from 'rxjs'
import * as qs from 'qs'

const API_URL = "https://cas-auth-provider.herokuapp.com/"

export const auth = (username, password) => {
    var data = qs.stringify({
        username: username,
        password: password
    })

    return Observable.from(axios({
        method: "POST",
        url: API_URL,
        data: data,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }))
    .map(response => response.data)
}
