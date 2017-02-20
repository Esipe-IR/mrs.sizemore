import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-wybo'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const LoadingOverlay = () => (
    <div className="overlay">
        <div className="overlay-content">
            <img src="/img/ripple.svg" alt="" />
        </div>
    </div>
)

const App = (props) => (
    <div className="app">
        <Topbar {...props}/>
        <Sidebar {...props} />

        <div className="container">
            {props.children}
            <Footer />
        </div>

        <NotificationsSystem theme={theme} />
        <ReactCSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={10}
            transitionLeaveTimeout={1200} >
            {props.loading ? <LoadingOverlay /> : null}
        </ReactCSSTransitionGroup>
    </div>
)

export default App
