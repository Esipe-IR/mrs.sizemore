import React from 'react'
import Footer from './Footer'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const LoadingOverlay = () => {
    return <div className="overlay">
        <div className="overlay-content">
            <img src="/img/ripple.svg" alt="" />
        </div>
    </div>
}

const App = (props) => (
    <div>
        {props.nav}

        <ReactCSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={10}
            transitionLeaveTimeout={1200} >
            {props.loading ? <LoadingOverlay /> : null}
        </ReactCSSTransitionGroup>

        <div className="container">
            {props.info}
            {props.children}
            <Footer />
        </div>
    </div>
)

export default App
