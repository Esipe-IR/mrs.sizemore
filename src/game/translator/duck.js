import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { createSelector } from 'reselect'
import { getRandom } from '../../services/obj'

const UPDATE_FORMERWORD = "old_wood/translator/UPDATE::FORMERWORD"
const UPDATE_INPUT = "old_wood/translator/UPDATE::INPUT"
const UPDATE_RESULT = "old_wood/translator/UPDATE::RESULT"

const INITIAL_STATE = Map({
    input: ""
})

export const updateFormerWord = createAction(UPDATE_FORMERWORD)
export const updateInput = createAction(UPDATE_INPUT)
export const updateResult = createAction(UPDATE_RESULT, (status, msg) => ({
    msg,
    status
}))

const getListWords = ({ appReducer }) => appReducer.get("worksheet").get("words")
const getFormerWord = ({ translatorReducer }) => translatorReducer.get("formerWord")

export const getRandomWord = createSelector(
    [getListWords, getFormerWord],
    (listWords, formerWord) => {
        let word = new Map()

        if (listWords.size) {
            let random = getRandom(listWords.size)
            word = listWords.get(random)

            if (formerWord && formerWord.equals(word)) {
                if (random + 1 < listWords.size - 1) word = listWords.get(random + 1)
                if (random - 1 > -1) word = listWords.get(random - 1)    
            }
        }

        return word
    }
)

export default handleActions({
    [UPDATE_FORMERWORD]: (state, action) => state.set("formerWord", action.payload),
    [UPDATE_INPUT]: (state, action) => state.set("input", action.payload), 
    [UPDATE_RESULT]: (state, action) => (state.withMutations(ctx => { 
        ctx.set("result", action.payload.status).set("resultMsg", action.payload.msg).set("input", "")
    }))
}, INITIAL_STATE)
