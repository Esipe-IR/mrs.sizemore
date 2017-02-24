import React from 'react'
import { connect } from 'react-redux'
import App from './component/App'
import { updateSidebar } from './duck'
import { logout } from '../firebase/duck'

class AppContainer extends React.Component {
    render() {
        return <App {...this.props} children={this.props.children} />
    }
}

AppContainer.propTypes = {
    loading: React.PropTypes.bool,
    sidebar: React.PropTypes.bool,
    user: React.PropTypes.object
}

const mapStateToProps = ({ app, firebase }) => ({
    loading: app.get("loading"),
    sidebar: app.get("sidebar"),
    user: firebase.get("user")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(logout()),
    closeNav: () => dispatch(updateSidebar(false)),
    toggleNav: (status) => () => dispatch(updateSidebar(!status))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
