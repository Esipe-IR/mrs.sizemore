import React from 'react'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { updateLoading } from '../../app/duck'
import { createWorksheet } from '../../firebase/duck'

class WorksheetCreator extends React.Component {
    componentDidMount() {
        this.props.updateLoading(false)
    }

    onSubmit(value) {
        let words = value.words
        let worksheet = Object.assign({}, value, {})
        delete worksheet.words

        this.props.createWorksheet(worksheet, words)
    }

    render() {
        return <Worksheet onSubmit={this.onSubmit.bind(this)} push={this.props.router.push} />
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLoading: (state) => dispatch(updateLoading(state)),
    createWorksheet: (worksheet, words) => dispatch(createWorksheet(worksheet, words))
})

export default connect(null, mapDispatchToProps)(WorksheetCreator)
