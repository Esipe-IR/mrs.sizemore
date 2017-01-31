const MODE_CHANGE = "old_wood/game/MODE::CHANGE"

const INITIAL_STATE = {
    mode: 0,
    answer: []
}

export const changeMode = mode => {
    return {
        type: MODE_CHANGE,
        payload: mode
    }
}

export default function gameReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case MODE_CHANGE:
            return Object.assign({}, state, {
                mode: action.payload
            })
        default:
            return state
    }
}
