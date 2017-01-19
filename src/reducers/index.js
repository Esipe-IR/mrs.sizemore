import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import homeReducer from '../home/duck';
import gameReducer from '../game/duck';
import translatorReducer from '../game/translator/duck'
import fillgapReducer from '../game/fillgap/duck'

const MainReducer = combineReducers({
    homeReducer,
    gameReducer,
    translatorReducer,
    fillgapReducer,
    routing: routerReducer
})

export default MainReducer
