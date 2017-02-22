import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as notificationsReducer } from 'reapop'
import appReducer from '../app/duck';
import gameReducer from '../game/duck';
import translatorReducer from '../game/translator/duck'
import fillgapReducer from '../game/fillgap/duck'
import editorReducer from '../editor/duck'
import accountReducer from '../account/duck'
import firebaseReducer from '../firebase/duck'

const MainReducer = combineReducers({
    app: appReducer,
    game: gameReducer,
    translator: translatorReducer,
    fillgap: fillgapReducer,
    editor: editorReducer,
    account: accountReducer,
    firebase: firebaseReducer,
    routing: routerReducer,
    form: formReducer,
    notifications: notificationsReducer()
})

export default MainReducer
