import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

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
