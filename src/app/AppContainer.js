import React from 'react'
import PropTypes from 'prop-types'
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
    loading: PropTypes.bool,
    sidebar: PropTypes.bool,
    user: PropTypes.object
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
