import React from 'react'

const UserIcon = ({user, logout}) => (
    <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-user"></i> {user.email} <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
                <li><a href="#" onClick={logout}>Logout</a></li>
            </ul>
        </li>
    </ul>
)

const SignIn = () => (
    <ul className="nav navbar-nav navbar-right">
        <li><a href="/account">Sign in</a></li>
    </ul>
)

const Nav = ({user, logout}) => (
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
                    <li><a href="/">Home <span className="sr-only">(current)</span></a></li>
                    <li><a href="#"><i className="fa fa-plus" aria-hidden="true"></i> Add worksheet</a></li>
                    <li><a href="#">About</a></li>
                </ul>

                {user ? <UserIcon user={user} logout={logout} /> : <SignIn />}
            </div>
        </div>
    </nav>
)

export default Nav
