import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'
import EditorContainer from './editor/EditorContainer'

const store = createStore(
    MainReducer,
    applyMiddleware(thunk)
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer}>
                <Route path="/" component={HomeContainer} />
                <Route path="/game/:sheet" component={GameContainer} />
                <Route path="/editor/:sheet" component={EditorContainer} />
                <Redirect from='*' to='/' />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
