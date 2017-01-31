import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './component/App'
import Nav from './component/Nav'
import Info from '../general/Info'
import { fetchUser } from './duck'

class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchUser())
    }

    info() {
        let status = this.props.error === null ? null : !this.props.error

        return <Info status={status} msg={this.props.errorMsg} />
    }

    nav() {
        return <Nav user={this.props.user} />
    }

    render() {
        return <App nav={this.nav()} info={this.info()} loading={this.props.loading} children={this.props.children} />
    }
}

function mapStateToProps(state) {
    const { appReducer } = state

    return {
        loading: appReducer.get("loading"),
        user: appReducer.get("user"),
        error: appReducer.get("error"),
        errorMsg: appReducer.get("errorMsg")
    }
}

AppContainer.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.bool,
    errorMsg: PropTypes.string
}

export default connect(mapStateToProps)(AppContainer)
