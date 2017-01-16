import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MainReducer from './reducers'

import App from './components/App'
import Home from './components/pages/Home'
import Game from './components/pages/Game'

const store = createStore(
    MainReducer,
    applyMiddleware(thunk)
)
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={App}>
                <Route path="/" component={Home} />
                <Route path="/game/:sheet" component={Game} />
                <Redirect from='*' to='/' />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
