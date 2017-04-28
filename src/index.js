import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import MainReducer from './reducers'
import AppContainer from './app/AppContainer'
import HomeContainer from './home/HomeContainer'
import GameContainer from './game/GameContainer'
import WorksheetCreator from './creator/worksheet/WorksheetCreator'
import WorksheetEditor from './editor/worksheet/WorksheetEditor'
import WordEditor from './editor/word/WordEditor'
import AccountContainer from './account/AccountContainer'

import { fetchUser } from './firebase/duck'
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

const auth = (nextState, replace) => {
    store.dispatch(fetchUser())
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
                <Route path="/create/worksheet" title="create-worksheet" component={WorksheetCreator} onEnter={logging} />
                <Route path="/edit/worksheet/:id" title="edit-worksheet" component={WorksheetEditor} onEnter={logging} />
                <Route path="/edit/word/:id" title="edit-word" component={WordEditor} onEnter={logging} />
                <Route path="/account" title="account" component={AccountContainer} onEnter={logging} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
