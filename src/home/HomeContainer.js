import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Home from './component/Home'
import { updateLoading } from '../app/duck'
import { fetchWorksheets } from '../firebase/duck'

class HomeContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheets) this.props.fetchWorksheets()
        else this.props.updateLoading(false)
    }

    render() {
        return <Home worksheets={this.props.worksheets} push={this.props.router.push} />
    }
}

HomeContainer.propTypes = {
    worksheets: PropTypes.object
}

const mapStateToProps = ({ firebase }) => ({
    worksheets: firebase.get("worksheets")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheets: () => dispatch(fetchWorksheets()),
    updateLoading: (status) => dispatch(updateLoading(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
