import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import { createSelector } from 'reselect'
import { getRandom } from '../../services/obj'

const UPDATE_USERWORDS = "old_wood/fillgap/UPDATE::USERWORDS"

const INITIAL_STATE = Map({
    userWords: List().setSize(20)
})

export const updateUserWords = createAction(UPDATE_USERWORDS)

const getUserWords = (fillgapReducer) => fillgapReducer.get("userWords")
const getWords = ({ appReducer }) => appReducer.get("worksheet").get("words")
const getMode = ({ gameReducer }) => gameReducer.get("mode")

export const getRandomizeWords = createSelector(
    [getWords, getMode],
    (words) => {
        let list = List()
        let size = words.size
        let exclude = []

        while (size) {
            let random1 = getRandom(words.size, exclude)

            if (!words.get(random1).get("examples") || !words.get(random1).get("examples").size) {
                exclude.push(random1)
                size--
                continue
            }

            let random2 = getRandom(words.get(random1).get("examples").size)
            let m = Map({
                id: words.get(random1).get("id"),
                en: words.get(random1).get("en"), 
                example: words.get(random1).get("examples").get(random2),
                definition: words.get(random1).get("definition")
            })
            
            list = list.push(m)
            exclude.push(random1)
            size--
        }

        return list
    }
)

export const getUserCount = createSelector(
    [getUserWords],
    (words) => {
        let count = 0

        for (let i = 0; i < words.size; i++) {
            if (words.get(i) && words.get(i) !== "") count++
        }

        return count
    }
)

export default handleActions({
    [UPDATE_USERWORDS]: (state, action) => state.set("userWords", action.payload)
}, INITIAL_STATE)
