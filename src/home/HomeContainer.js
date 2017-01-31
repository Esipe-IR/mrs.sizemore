import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'

import { fetchWorksheets } from '../app/duck'

class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchWorksheets())
    }

    render() {
        return <Home worksheets={this.props.worksheets} />
    }
}

function mapStateToProps(state) {
    const { appReducer } = state

    return {
        worksheets: appReducer.get("worksheets")
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.array
}

export default connect(mapStateToProps)(HomeContainer)
