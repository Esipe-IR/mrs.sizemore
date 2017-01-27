import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from '../app/duck';
import homeReducer from '../home/duck';
import gameReducer from '../game/duck';
import translatorReducer from '../game/translator/duck'
import fillgapReducer from '../game/fillgap/duck'
import keyboardReducer from '../keyboard/duck'
import editorReducer from '../editor/duck'

const MainReducer = combineReducers({
    appReducer,
    homeReducer,
    gameReducer,
    translatorReducer,
    fillgapReducer,
    keyboardReducer,
    editorReducer,
    routing: routerReducer
})

export default MainReducer
