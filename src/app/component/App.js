import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const App = ({displayLoading, children}) => (
    <div>
        <Nav />

        <div className="container">
            { children }

            <Footer />
        </div>

        <div className="overlay" style={displayLoading}>
            <div className="overlay-content">
                <img src="/img/ripple.svg" alt="" />
            </div>
        </div>
    </div>
)

export default App
