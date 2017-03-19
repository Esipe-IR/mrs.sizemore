import React from 'react'

const User = ({user}) => (
    <li className="text-center">
        <i className="fa fa-user" aria-hidden="true"></i> {user.get("email")}
    </li>
)

const SignIn = (props) => (
    <li>
        <button onClick={() => {props.router.push("/account");props.closeNav()}}>
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

const cleaner = (e) => {
    e.preventDefault()
    
    navigator.serviceWorker.getRegistrations()
    .then(registrations => {
        for(let registration of registrations) {
            registration.unregister()
        }
    })
    
    localStorage.clear()

    window.FB.AppEvents.logEvent("clearCache");
    location.reload()
}

const Sidebar = (props) => (
    <div id="sidebar-wrapper" className={props.sidebar ? "toggled" : ""}>
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <button onClick={props.closeNav}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </li>

            {props.user ? <User user={props.user} /> : <SignIn {...props} />}
            {props.user ? <Logout logout={props.logout} /> : null}

            <li>
                <button className="text-danger" onClick={cleaner}>
                    <i className="fa fa-trash" aria-hidden="true"></i> Clear cache
                </button>
            </li>

            <li className="text-center">
                <a href="https://github.com/Esipe-IR/mrs.sizemore">
                    <i className="fa fa-github-square fa-2x" aria-hidden="true"></i>
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar
