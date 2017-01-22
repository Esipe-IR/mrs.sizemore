const RECEIVE_CLOSE = "old_wood/keyboard/RECEIVE::CLOSE"
const KEYBOARD_STATE = "old_wood/keyboard/KEYBOARD::STATE"
const INITIAL_STATE = {
    open: false,
    close: false
}

export const receiveClose = () => {
    return {
        type: RECEIVE_CLOSE
    }
}

export const keyboardState = (state) => {
    return {
        type: KEYBOARD_STATE,
        payload: state
    }
}

export default function keyboardReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case RECEIVE_CLOSE:
            return Object.assign({}, state, {
                close: true
            })
        case KEYBOARD_STATE:
            return Object.assign({}, state, {
                open: action.payload
            })
        default:
            return state
    }
}
