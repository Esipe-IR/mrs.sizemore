import { fromJS } from 'immutable'

export const localConfig = { 
    serialize: (state) => {
        const { 
            app,
            game,
            account,
            translator,
            fillgap
        } = state

        let newApp = app.set("sidebar", null)
        let newAccount = account.withMutations(ctx => 
            ctx.set("error", null).set("user", null)
        )
        let newTranslator = translator.withMutations(ctx => 
            ctx.set("input", "").set("word", null)
        )
        let newFillgap = fillgap.set("userWords", [])
        
        let newState = {
            app: newApp,
            game: game,
            account: newAccount,
            translator: newTranslator,
            fillgap: newFillgap
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
