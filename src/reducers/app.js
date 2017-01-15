import { HELP } from '../constants'

const appReducer = (state = {}, action) => {
    switch(action.type) {
        case HELP:
            return Object.assign({}, state, {
                show: true,
                number: action.number
            })
        default:
            return state
    }
}

export default appReducer
