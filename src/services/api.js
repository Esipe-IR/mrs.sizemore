import axios from 'axios'
import { API_URL } from '../constants'

export const apiCall = (word) => {
    return axios.get(API_URL, {
        params: {
            word: word
        }
    })
}
