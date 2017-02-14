import React from 'react'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { updateLoading, createWord, createWorksheet } from '../../app/duck'

class WorksheetCreator extends React.Component {
    componentDidMount() {
        this.props.dispatch(updateLoading(false))
    }

    onSubmit(value) {
        let words = value.words
        let worksheet = Object.assign({}, value, {})
        delete worksheet.words

        if (words) {
            words.forEach((w, i) => {
                this.props.dispatch(createWord(w))
            })
        }

        this.props.dispatch(createWorksheet(value))
    }

    render() {
        return <Worksheet onSubmit={this.onSubmit.bind(this)} />
    }
}

export default connect()(WorksheetCreator)
