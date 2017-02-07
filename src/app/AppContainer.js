import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './component/App'
import Nav from './component/Nav'
import Info from '../general/Info'
import { fetchUser, logout } from './duck'

class AppContainer extends React.Component {
    componentDidMount() {
        this.props.getUser()
    }

    info() {
        let status = this.props.error === null ? null : !this.props.error
        return <Info status={status} msg={this.props.errorMsg} />
    }

    nav() {
        return <Nav user={this.props.user} logout={this.props.logout} />
    }

    render() {
        return <App nav={this.nav()} info={this.info()} loading={this.props.loading} children={this.props.children} />
    }
}

AppContainer.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.bool,
    errorMsg: PropTypes.string
}

const mapStateToProps = ({appReducer}) => ({
    loading: appReducer.get("loading"),
    user: appReducer.get("user"),
    error: appReducer.get("error"),
    errorMsg: appReducer.get("errorMsg")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: () => dispatch(fetchUser()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
