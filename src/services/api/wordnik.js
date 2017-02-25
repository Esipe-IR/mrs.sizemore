import axios from 'axios'

const API_URL = "http://api.wordnik.com:80/v4"
const API_KEY = "b2d2689701f5127dd3e2e0607b7071a94794fb2fe51b8e71b"

const client = axios.create({
    baseURL: API_URL,
    params: {
        api_key: API_KEY,
        limit: 10,
        includeDuplicates: false,
        useCanonical: false,
    }
});

export const getDefinitions = (word) => {
    let url = "/word.json/" + word + "/definitions"
    
    return client.get(url)
}

export const getExamples = (word) => {
    let url = "/word.json/" + word + "/examples"

    return client.get(url)
}
