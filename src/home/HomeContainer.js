import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'
import { fetchWorksheets } from '../app/duck'

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWorksheets())
    }

    render() {
        return <Home worksheets={this.props.worksheets} />
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.object
}

const mapStateToProps = ({ appReducer }) => ({
    worksheets: appReducer.get("worksheets")
})

export default connect(mapStateToProps)(HomeContainer)
