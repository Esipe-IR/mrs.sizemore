import React from 'react'
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
        return <Home user={this.props.user} worksheets={this.props.worksheets} push={this.props.router.push} />
    }
}

HomeContainer.propTypes = {
    worksheets: React.PropTypes.object,
    user: React.PropTypes.object
}

const mapStateToProps = ({ firebase }) => ({
    worksheets: firebase.get("worksheets"),
    user: firebase.get("user")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheets: () => dispatch(fetchWorksheets()),
    updateLoading: (status) => dispatch(updateLoading(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
