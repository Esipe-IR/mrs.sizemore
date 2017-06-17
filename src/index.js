import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'

import { logEvent } from './services/analytics'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    MainReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(browserHistory),
            thunk
        )
    )
)

const history = syncHistoryWithStore(browserHistory, store)

const logging = (nextState, replace) => {
    const { routing } = store.getState()

    logEvent("page", null, {path: routing.locationBeforeTransitions.pathname})
}

window.dev = true;

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer}>
                <Route path="/" title="home" initial={true} component={HomeContainer} onEnter={logging} />
                <Route path="/game/:id" title="game" component={GameContainer} onEnter={logging} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
