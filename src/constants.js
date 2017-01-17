export const HELP = "HELP"
export const WORD_COUNT_ADD = "WORD_COUNT::ADD"
export const WORD_COUNT_LESS = "WORD_COUNT::LESS"
export const TRANSLATE_UPDATE = "TRANSLATE::UPDATE"
export const TRANSLATE_ANSWER = "TRANSLATE::ANSWER"

export const REQUEST = "REQUEST"
export const RECEIVE_SUCCESS = "RECEIVE_SUCCESS"
export const RECEIVE_FAILED = "RECEIVE_FAILED"
export const RECEIVE_FIREBASE = "RECEIVE_FIREBASE"

export const API_URL = "php/play.php"
export const LOCAL_API_URL = "http://localhost/worksheet-trainer/public/php/play.php"

export const DEFAULT_APP = {
    wordcount: 0,
    mode: "easy",
    success: 0,
    error: 0,
    translate: {
        status: null
    }
}

export const DEFAULT_API = {
    theme: "",
    worksheet: 0,
    isFetching: false, 
    error: false,
    words: [],
    definitions: [],
    examples: []
}

export const DEFAULT_FIREBASE = {
    worksheets: []
}
