const LOADING_STATE = "old_wood/app/LOADING::STATE"
const INITIAL_STATE = {
    loading: true
}

export const loadingState = (state) => {
    return {
        type: LOADING_STATE,
        payload: state
    }
}

export default function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOADING_STATE:
            return Object.assign({}, state, {
                loading: action.payload
            })
        default:
            return state
    }
}
