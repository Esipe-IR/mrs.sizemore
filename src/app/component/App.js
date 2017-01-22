import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const App = ({loadingSize, children}) => (
    <div>
        <Nav />

        <div className="container">
            <div>
                { children }
            </div>

            <Footer />
        </div>

        <div id="myNav" className="overlay" style={loadingSize}>
            <div className="overlay-content">
                <img src="/img/rolling.svg" alt="" />
            </div>
        </div>
    </div>
)

export default App
