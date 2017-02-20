import React from 'react'

const User = ({user}) => (
    <li className="text-center text-primary">
        <i className="fa fa-user" aria-hidden="true"></i> {user.email}
    </li>
)

const SignIn = (props) => (
    <li>
        <button onClick={() => {props.router.push("/account"); props.closeNav()}}>
            <i className="fa fa-sign-in" aria-hidden="true"></i> Sign in
        </button>
    </li>
)

const Logout = ({ logout }) => (
    <li>
        <button onClick={logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
        </button>
    </li>
)

const Sidebar = (props) => (
    <div id="sidebar-wrapper" className={props.sidebar ? "toggled" : ""}>
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <button onClick={props.closeNav}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </li>

            {props.user ? <User user={props.user} /> : <SignIn {...props} />}

            <li>
                <button onClick={() => {props.router.push("/"); props.closeNav()}}>
                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </button>
            </li>

            <li>
                <button className="text-success" onClick={() => {props.router.push("/create/worksheet"); props.closeNav()}}>
                    <i className="fa fa-plus" aria-hidden="true"></i> Create worksheet
                </button>
            </li>

            <li>
                <button onClick={() => {props.router.push("/about"); props.closeNav()}}>
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i> About
                </button>
            </li>

            <li>
                <button onClick={() => {props.router.push("/contact"); props.closeNav()}}>
                    <i className="fa fa-envelope-o" aria-hidden="true"></i> Contact
                </button>
            </li>

            <li>
                <button className="text-danger" onClick={() =>  {localStorage.clear(); props.router.push("/contact"); props.closeNav()}}>
                    <i className="fa fa-trash" aria-hidden="true"></i> Clear cache
                </button>
            </li>

            {props.user ? <Logout logout={props.logout} /> : null}

            <li className="text-center">
                <a href="https://github.com/Esipe-IR/mrs.sizemore">
                    <i className="fa fa-github-square fa-4x" aria-hidden="true"></i>
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar
