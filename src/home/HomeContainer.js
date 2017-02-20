import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'
import { fetchWorksheets } from '../app/duck'
import { push } from 'react-router-redux'

class HomeContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheets) this.props.fetchWorksheets()
    }

    render() {
        return <Home worksheets={this.props.worksheets} push={this.props.push} />
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.object
}

const mapStateToProps = ({ appReducer }) => ({
    worksheets: appReducer.get("worksheets")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheets: () => dispatch(fetchWorksheets()),
    push: (link) => dispatch(push(link))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
