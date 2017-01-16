import React from 'react'

import Nav from './app/Nav'
import Footer from './app/Footer'

const App = (props) => (
    <div>
        <Nav />

        <div className="container">
            <div>
                { props.children }
            </div>

            <Footer />
        </div>
    </div>
)

export default App
