import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, push } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'
import WorksheetContainer from './editor/worksheet/WorksheetContainer'
import WordContainer from './editor/word/WordContainer'
import AccountContainer from './account/AccountContainer'

import { getCurrentUser } from './services/firebase'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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

const checkEditor = (nextState, replace) => {
    getCurrentUser()
    .then(u => !u ? store.dispatch(push("/account")) : null)
}

const checkAccount = (nextState, replace) => {
    getCurrentUser()
    .then(u => u ? store.dispatch(push("/")) : null)
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer}>
                <Route path="/" component={HomeContainer} />
                <Route path="/game/:id" component={GameContainer} />
                <Route path="/editor/worksheet/:id" component={WorksheetContainer} onEnter={checkEditor} />
                <Route path="/editor/word/:id" component={WordContainer} onEnter={checkEditor} />
                <Route path="/account" component={AccountContainer} onEnter={checkAccount} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
