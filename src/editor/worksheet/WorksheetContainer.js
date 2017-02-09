import React from 'react'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { fetchWorksheet } from '../../app/duck'

class WorksheetContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWorksheet(this.props.params.id))
    }

    onSubmit(value) {
        console.log(value)
    }

    render() {        
        return this.props.worksheet ? 
            <Worksheet onSubmit={this.onSubmit.bind(this)} initialValues={this.props.worksheet.toJS()} /> 
            : 
            null
    }
}

const mapStateToProps = ({ appReducer }) => ({
    worksheet: appReducer.get("worksheet")
})

export default connect(mapStateToProps)(WorksheetContainer)
