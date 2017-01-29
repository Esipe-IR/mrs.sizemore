import React from 'react'

const Nav = () => (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Old Wood</a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </div>
        </div>
    </nav>
)

export default Nav
