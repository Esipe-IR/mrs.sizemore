import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Info from './Info'
import Footer from './Footer'

const LoadingOverlay = () => (
    <div className="overlay">
        <div className="overlay-content">
            <img src="/img/ripple.svg" alt="" />
        </div>
    </div>
)

const App = (props) => (
    <div>
        <Topbar onClick={props.clickNav} sidebar={props.sidebar} />
        <Sidebar user={props.user} logout={props.logout} sidebar={props.sidebar} onClick={props.clickNav} />

        <ReactCSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={10}
            transitionLeaveTimeout={1200} >
            {props.loading ? <LoadingOverlay /> : null}
        </ReactCSSTransitionGroup>

        <div className="container">
            {props.error === null ? null : <Info status={!props.error} msg={props.errorMsg} />}
            {props.children}
            <Footer />
        </div>
    </div>
)

export default App
