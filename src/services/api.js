import axios from 'axios'
import os from 'os'
import fetchJsonp from 'fetch-jsonp'
import { LOCAL_API_URL, API_URL } from '../constants'

let API = () => ({
    Play(sheet) {
        if (os.hostname().indexOf("local") > - 1) {
            return this._jsonp(sheet)    
        }

        return this._default(sheet)
    },

    _jsonp(sheet) {
        let p = new Promise((resolve, reject) => {
            let url = LOCAL_API_URL + '?sheet=' + sheet

            fetchJsonp(url)
            .then((response) => {
                response.json()
                .then((r) => {
                    resolve(atob(r))
                });
            })
            .catch(function(ex) {
                reject(ex)
            })
        })

        return p
    },

    _default(sheet) {
        return axios.get(API_URL, {
            params: {
                sheet: sheet
            }
        })
    }
})

export default API
