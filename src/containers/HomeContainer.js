import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from '../components/pages/Home'

import { fetchWorksheets } from '../actions'

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
    const { firebaseReducer } = state

    return {
        worksheets: firebaseReducer.worksheets
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.array
}

export default connect(mapStateToProps)(HomeContainer)
