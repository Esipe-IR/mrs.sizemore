import { fromJS } from 'immutable'

export const serialize = (state) => {
    const {
        app,
        firebase,
        game,
        account,
        translator,
        fillgap
    } = state

    let newTranslator = translator.withMutations(ctx => 
        ctx.set("input", "").set("word", null)
    )

    return JSON.stringify({
        app: app.set("sidebar", null),
        firebase: firebase,
        game: game,
        account: account.set("error", null),
        translator: newTranslator,
        fillgap: fillgap.set("userWords", [])
    })
}

export const deserialize = (serializedState) => {
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

export const localConfig = {
    serialize: serialize,
    deserialize: deserialize
}
