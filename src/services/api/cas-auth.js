import axios from 'axios'

const API_URL = "https://cas-auth-provider.herokuapp.com/"

export const auth = (username, password) => {
    return axios.post(API_URL, {
        username: username,
        password: password
    })
}
