import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'
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
import UPEMContainer from './upem/UPEMContainer'
import NotFound from './exception/NotFound'

import { notifError } from './app/duck'
import { fetchUser } from './firebase/duck'

import { localConfig } from './services/localStorage'
import { registerServiceWorker } from './services/serviceWorker'

registerServiceWorker()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    MainReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(browserHistory),
            thunk
        ),
        persistState(null, localConfig)
    )
)

const history = syncHistoryWithStore(browserHistory, store)

const auth = (nextState, replace) => {
    store.dispatch(fetchUser())
}

const isConnected = (nextState, replace) => {
    const  { firebase } = store.getState()
    const u = firebase.get("user")

    if (!u) {
        store.dispatch(notifError("You are not connected"))
        return store.dispatch(push("/account"))
    }

    if (!u.get("emailVerified")) {
        store.dispatch(notifError("Your email has not been verified"))
        return store.dispatch(push("/"))
    }

    if (!u.get("role")) {
        store.dispatch(notifError("You are not accredited by the administrator"))
        return store.dispatch(push("/"))
    }
}

const isNotConnected = (nextState, replace) => {
    const  { firebase } = store.getState()
    const u = firebase.get("user")

    if (u) store.dispatch(push("/"))
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={AppContainer} onEnter={auth}>
                <Route path="/" title="home" initial={true} component={HomeContainer} />
                <Route path="/game/:id" title="game" component={GameContainer} />
                <Route path="/create/worksheet" title="create-worksheet" component={WorksheetCreator} onEnter={isConnected} />
                <Route path="/edit/worksheet/:id" title="edit-worksheet" component={WorksheetEditor} onEnter={isConnected} />
                <Route path="/edit/word/:id" title="edit-word" component={WordEditor} onEnter={isConnected} />
                <Route path="/account" title="account" component={AccountContainer} onEnter={isNotConnected} />
            </Route>
            <Route path="/upem" title="upem" component={UPEMContainer} />
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById("root")
)
