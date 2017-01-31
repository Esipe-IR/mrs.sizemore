import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from '../app/duck';
import gameReducer from '../game/duck';
import translatorReducer from '../game/translator/duck'
import fillgapReducer from '../game/fillgap/duck'
import keyboardReducer from '../keyboard/duck'
import editorReducer from '../editor/duck'
import accountReducer from '../account/duck'

const MainReducer = combineReducers({
    appReducer,
    gameReducer,
    translatorReducer,
    fillgapReducer,
    keyboardReducer,
    editorReducer,
    accountReducer,
    routing: routerReducer
})

export default MainReducer
