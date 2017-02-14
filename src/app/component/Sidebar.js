import React from 'react'

const User = ({user}) => (
    <li>
        <a href="#">
            <i className="fa fa-user" aria-hidden="true"></i> {user.email}
        </a>
    </li>
)

const SignIn = () => (
    <li>
        <a href="/account">
            <i className="fa fa-sign-in" aria-hidden="true"></i> Sign in
        </a>
    </li>
)

const Logout = ({ logout }) => (
    <li>
        <a href="#" onClick={logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
        </a>
    </li>
)

const Sidebar = (props) => (
    <div id="sidebar-wrapper" className={props.sidebar ? "toggled" : ""}>
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <a href="#" onClick={props.onClick(props.sidebar)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </a>
            </li>

            {props.user ? <User user={props.user} /> : <SignIn />}

            <li>
                <a href="/">
                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </a>
            </li>

            <li>
                <a href="/create/worksheet">
                    <i className="fa fa-plus" aria-hidden="true"></i> Create worksheet
                </a>
            </li>

            <li>
                <a href="/about">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i> About
                </a>
            </li>

            <li>
                <a href="/contact">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i> Contact
                </a>
            </li>

            {props.user ? <Logout logout={props.logout} /> : null}
        </ul>
    </div>
)

export default Sidebar
