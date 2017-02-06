import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import { createSelector } from 'reselect'
import { getRandom } from '../../services/obj'

const UPDATE_USERWORDS = "old_wood/fillgap/UPDATE::USERWORDS"

const INITIAL_STATE = Map({
    userWords: List()
})

export const updateUserWords = createAction(UPDATE_USERWORDS)

const getWord = (state) => state.get("worksheet").get("words")
export const getRandomizeWords = createSelector(
    [getWord],
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

        console.log(List.isList(list))

        return list
    }
)

export default handleActions({
    [UPDATE_USERWORDS]: (state, action) => state.set("userWords", action.payload)
}, INITIAL_STATE)
