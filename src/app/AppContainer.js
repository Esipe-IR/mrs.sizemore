import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './component/App'

class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.displayLoading = this.displayLoading.bind(this)
    }

    displayLoading() {
        if (this.props.loading) {
            return {display: "block"}
        }

        return {display: "none"}
    }

    render() {
        return (
            <App displayLoading={this.displayLoading()} children={this.props.children} />
        )
    }
}

function mapStateToProps(state) {
    const { appReducer } = state

    return {
        loading: appReducer.loading
    }
}

AppContainer.propTypes = {
    loading: PropTypes.bool
}

export default connect(mapStateToProps)(AppContainer)
