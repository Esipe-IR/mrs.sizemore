import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import App from './component/App'

class AppContainer extends React.Component {
    render() {
        return <App {...this.props} children={this.props.children} version="1.8" />
    }
}

AppContainer.propTypes = {
    loading: PropTypes.bool
}

const mapStateToProps = ({ app, firebase }) => ({
    loading: app.get("loading")
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
