import React from 'react'

const App = (props) => (
    <div className="card-form">
        <div className="form-title">
            Worksheet Trainer
        </div>

        <div className="form-body">
            { props.children }
        </div>

        <div className="rule"></div>

        <div className="form-footer">
            <p>@Credits to Adrien Rougier &amp; Vincent Rasquier</p>
        </div>
    </div>
)

export default App
