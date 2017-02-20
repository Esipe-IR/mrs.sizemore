import React from 'react'
import { connect } from 'react-redux'
import App from './component/App'
import { fetchUser, logout, updateSidebar } from './duck'

class AppContainer extends React.Component {
    componentDidMount() {
        this.props.getUser()
    }

    render() {
        return <App {...this.props} children={this.props.children} />
    }
}

AppContainer.propTypes = {
    loading: React.PropTypes.bool,
    user: React.PropTypes.object,
    error: React.PropTypes.bool,
    errorMsg: React.PropTypes.string,
    sidebar: React.PropTypes.bool
}

const mapStateToProps = ({appReducer}) => ({
    loading: appReducer.get("loading"),
    user: appReducer.get("user"),
    error: appReducer.get("error"),
    errorMsg: appReducer.get("errorMsg"),
    sidebar: appReducer.get("sidebar")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: () => dispatch(fetchUser()),
    logout: () => dispatch(logout()),
    openNav: () => dispatch(updateSidebar(true)),
    closeNav: () => dispatch(updateSidebar(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
