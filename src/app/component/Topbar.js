import React from 'react'

const Topbar = (props) => (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            {props.routes[1].title === "home" ?
                <div className="navbar-btn">
                    <button type="button" className="navbar-toggle" onClick={props.toggleNav(props.sidebar)}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                :
                <div className="navbar-btn">
                    <button 
                    type="button" 
                    className="navbar-toggle" 
                    onClick={() => props.routes[1].title === "account" ? props.router.push("/") : props.router.goBack()}>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i> Back
                    </button>
                </div>
            }

            <div className="navbar-header">
                <a className="navbar-brand" href="/">
                    <b>
                        Mrs. Sizemore <span className="label label-info">1.4</span>
                    </b>
                </a>
            </div>
        </div>
    </nav>
)

export default Topbar
