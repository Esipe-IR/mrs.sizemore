import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import apiReducer from './api'
import appReducer from './app'
import firebaseReducer from './firebase'

const MainReducer = combineReducers({
    apiReducer,
    appReducer,
    firebaseReducer,
    routing: routerReducer
})

export default MainReducer
