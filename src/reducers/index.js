import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './app'
import gameReducer from './game'

const MainReducer = combineReducers({
    appReducer,
    gameReducer,
    routing: routerReducer
})

export default MainReducer
