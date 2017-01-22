import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './component/App'

class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getLoadingSize = this.getLoadingSize.bind(this)
    }

    getLoadingSize() {
        if (this.props.loading) {
            return {width: "100%"}
        }

        return {display: "none"}
    }

    render() {
        return (
            <App loadingSize={this.getLoadingSize()} children={this.props.children} />
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
