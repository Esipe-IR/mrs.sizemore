import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import apiReducer from './api'

const MainReducer = combineReducers({
    apiReducer,
    routing: routerReducer
})

export default MainReducer
