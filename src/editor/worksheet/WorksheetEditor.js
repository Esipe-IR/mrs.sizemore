import React from 'react'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { fetchWorksheet, createWord, editWord, editWorksheet, deleteWord } from '../../app/duck'
import { updateDelete } from '../duck'

class WorksheetEditor extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWorksheet(this.props.params.id))
    }

    onSubmit(value) {
        let words = value.words
        let worksheet = Object.assign({}, value, {})
        delete worksheet.words

        if (words) {
            words.forEach((w, i) => {
                if (w.id) this.props.dispatch(editWord(w))
                else this.props.dispatch(createWord(w))
            })
        }

        this.props.del.forEach(w => {
            this.props.dispatch(deleteWord(w))
        })

        this.props.dispatch(editWorksheet(value))
    }

    addDelete(id) {
        if (!id) return
        
        let del = this.props.del.push(id)
        this.props.dispatch(updateDelete(del))
    }

    render() {
        return this.props.worksheet ? 
            <Worksheet
                onSubmit={this.onSubmit.bind(this)}
                addDelete={this.addDelete.bind(this)}
                initialValues={this.props.worksheet.toJS()} /> 
            : 
            null
    }
}

WorksheetEditor.propTypes = {
    worksheet: React.PropTypes.object,
    del: React.PropTypes.array
}

const mapStateToProps = ({ appReducer, editorReducer }) => ({
    worksheet: appReducer.get("worksheet"),
    del: editorReducer.get("del")
})

export default connect(mapStateToProps)(WorksheetEditor)
