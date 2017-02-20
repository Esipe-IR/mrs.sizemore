import { fromJS } from 'immutable'

export const localConfig = { 
    serialize: (state) => {
        const { 
            appReducer,
            gameReducer,
            accountReducer,
            translatorReducer,
            fillgapReducer
        } = state

        let newAppReducer = appReducer.set("sidebar", null)
        let newAccountReducer = accountReducer.withMutations(ctx => 
            ctx.set("error", null).set("user", null)
        )
        let newTranslatorReducer = translatorReducer.withMutations(ctx => 
            ctx.set("input", "").set("word", null)
        )
        let newFillgapReducer = fillgapReducer.set("userWords", [])
        
        let newState = {
            appReducer: newAppReducer,
            gameReducer: gameReducer,
            accountReducer: newAccountReducer,
            translatorReducer: newTranslatorReducer,
            fillgapReducer: newFillgapReducer
        }

        return JSON.stringify(newState)
    },
    deserialize: (serializedState) => {
        if (!serializedState) {
            return
        }

        try {
            var obj = JSON.parse(serializedState)
        } catch (err) {
            return
        }
        
        var state = {}
        let keys = Object.keys(obj)

        keys.forEach(k => {
            state[k] = fromJS(obj[k])
        })

        return state
    }
}
