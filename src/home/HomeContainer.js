import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'
import { fetchWorksheets } from '../app/duck'

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.fetchWorksheets()
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheets: () => dispatch(fetchWorksheets())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
