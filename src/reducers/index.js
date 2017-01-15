import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import apiReducer from './api'
import appReducer from './app'

const MainReducer = combineReducers({
    apiReducer,
    appReducer,
    routing: routerReducer
})

export default MainReducer
