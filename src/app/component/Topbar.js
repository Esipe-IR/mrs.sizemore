import React from 'react'

const Topbar = ({onClick, sidebar}) => (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-btn">
                <button type="button" className="navbar-toggle" onClick={onClick(sidebar)}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>

            <div className="navbar-header">
                <a className="navbar-brand" href="/"><b>Old Wood <span className="badge">Beta</span></b></a>
            </div>
        </div>
    </nav>
)

export default Topbar
