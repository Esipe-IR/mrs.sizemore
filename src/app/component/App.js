import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const App = ({displayLoading, children}) => (
    <div>
        <Nav />

        <div className="container">
            <div>
                { children }
            </div>

            <Footer />
        </div>

        <div id="myNav" className="overlay" style={displayLoading}>
            <div className="overlay-content">
                <img src="/img/rolling.svg" alt="" />
            </div>
        </div>
    </div>
)

export default App
