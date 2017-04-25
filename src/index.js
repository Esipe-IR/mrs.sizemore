import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
//import persistState from 'redux-localstorage'
import { Router, Route, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, push } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'
import WorksheetCreator from './creator/worksheet/WorksheetCreator'
import WorksheetEditor from './editor/worksheet/WorksheetEditor'
import WordEditor from './editor/word/WordEditor'
import AccountContainer from './account/AccountContainer'
import NotFound from './exception/NotFound'

import { notifError } from './app/duck'
import { fetchUser } from './firebase/duck'

//import { localConfig } from './services/localStorage'
import { registerServiceWorker } from './services/serviceWorker'
import { logEvent } from './services/analytics'

registerServiceWorker()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    MainReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(browserHistory),
            thunk
        )
        //persistState(null, localConfig)
    )
)

const history = syncHistoryWithStore(browserHistory, store)

const auth = (nextState, replace) => {
    store.dispatch(fetchUser())
}

const isConnected = (nextState, replace) => {
    const { firebase, routing } = store.getState()
    const u = firebase.get("user")

    if (!u) {
        logEvent("errorNotConnected", null, {path: routing.locationBeforeTransitions.pathname})
        store.dispatch(notifError("You are not connected"))
        return store.dispatch(push("/account"))
    }

    if (!u.get("emailVerified")) {
        logEvent("errorEmailNotVerified", null, {user: u.get("email"), path: routing.locationBeforeTransitions.pathname})
        store.dispatch(notifError("Your email has not been verified"))
        return store.dispatch(push("/"))
    }

    logEvent("page", null, {path: routing.locationBeforeTransitions.pathname, user: u.get("email")})
}

const isNotConnected = (nextState, replace) => {
    const { firebase } = store.getState()
    const u = firebase.get("user")

    if (u) store.dispatch(push("/"))
}

const logging = (nextState, replace) => {
    const { routing, firebase } = store.getState()
    let u = firebase.get("user")

    if (u) {
        u = u.get("email")
    }

    logEvent("page", null, {path: routing.locationBeforeTransitions.pathname, user: u})
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer} onEnter={auth}>
                <Route path="/" title="home" initial={true} component={HomeContainer} onEnter={logging} />
                <Route path="/game/:id" title="game" component={GameContainer} onEnter={logging} />
                <Route path="/create/worksheet" title="create-worksheet" component={WorksheetCreator} onEnter={isConnected} />
                <Route path="/edit/worksheet/:id" title="edit-worksheet" component={WorksheetEditor} onEnter={isConnected} />
                <Route path="/edit/word/:id" title="edit-word" component={WordEditor} onEnter={isConnected} />
                <Route path="/account" title="account" component={AccountContainer} onEnter={isNotConnected} />
            </Route>
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById("root")
)
