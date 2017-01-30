import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './component/App'
import { fetchUser } from './duck'

class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchUser())
    }

    render() {
        return (
            <App error={this.props.error} errorMsg={this.props.errorMsg} loading={this.props.loading} children={this.props.children} user={this.props.user} />
        )
    }
}

function mapStateToProps(state) {
    const { appReducer } = state

    return {
        loading: appReducer.loading,
        user: appReducer.user,
        error: appReducer.error,
        errorMsg: appReducer.errorMsg
    }
}

AppContainer.propTypes = {
    loading: PropTypes.bool
}

export default connect(mapStateToProps)(AppContainer)
