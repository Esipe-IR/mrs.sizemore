export const HELP = "HELP"
export const WORD_COUNT_ADD = "WORD_COUNT::ADD"
export const WORD_COUNT_LESS = "WORD_COUNT::LESS"
export const TRANSLATE_ANSWER = "TRANSLATE::ANSWER"
export const RECEIVE_FIREBASE = "FIREBASE::RECEIVE"

export const DEFAULT_GAME_STATE = {
    wordcount: 0,
    mode: "easy",
    user: {
        nb_error: 0,
        nb_success: 0,
        errors: [],
        success: [] 
    },
    worksheet: {
        id: 0,
        theme: "",
        words: []
    },
    result: {
        status: null,
        word_id: 0,
        msg: ""
    }
}

export const DEFAULT_APP = {
}
