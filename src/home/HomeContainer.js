import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'

import { fetchWorksheets } from './duck'

class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchWorksheets())
    }

    render() {
        return (
            <Home worksheets={this.props.worksheets} />
        )
    }
}

function mapStateToProps(state) {
    const { homeReducer } = state

    return {
        worksheets: homeReducer.worksheets
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.array
}

export default connect(mapStateToProps)(HomeContainer)
