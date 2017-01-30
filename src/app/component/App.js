import React from 'react'
import Footer from './Footer'
import Nav from './Nav'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const LoadingOverlay = () => {
    return <div className="overlay">
        <div className="overlay-content">
            <img src="/img/ripple.svg" alt="" />
        </div>
    </div>
}

const App = ({loading, children, user}) => (
    <div>
        <Nav user={user} />

        <ReactCSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1200} >
            {loading ? <LoadingOverlay /> : null}
        </ReactCSSTransitionGroup>

        <div className="container">
            { children }

            <Footer />
        </div>
    </div>
)

export default App
