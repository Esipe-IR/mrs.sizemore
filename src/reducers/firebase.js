import { RECEIVE_FIREBASE, DEFAULT_FIREBASE } from '../constants'

const firebaseReducer = (state = DEFAULT_FIREBASE, action) => {
    switch(action.type) {
        case RECEIVE_FIREBASE:
            return Object.assign({}, state, {
                worksheets: action.data
            })
        default:
            return state
    }
}

export default firebaseReducer
