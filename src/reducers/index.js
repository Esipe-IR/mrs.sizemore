import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as notificationsReducer } from 'reapop'
import appReducer from '../app/duck';
import translatorReducer from '../game/translator/duck'
import firebaseReducer from '../firebase/duck'

const MainReducer = combineReducers({
    app: appReducer,
    translator: translatorReducer,
    firebase: firebaseReducer,
    routing: routerReducer,
    form: formReducer,
    notifications: notificationsReducer()
})

export default MainReducer
