import React from 'react'
import { connect } from 'react-redux'
import Worksheet from './component/Worksheet'
import { fetchWorksheet, createWord, editWord, editWorksheet, deleteWord } from '../../firebase/duck'
import { updateDelete } from '../duck'

class WorksheetEditor extends React.Component {
    componentDidMount() {
        this.props.fetchWorksheet(this.props.params.id)
    }

    onSubmit(value) {
        let words = value.words
        let worksheet = Object.assign({}, value, {})
        delete worksheet.words

        if (words) {
            words.forEach((w, i) => {
                if (w.id) this.props.editWord(w)
                else this.props.createWord(w)
            })
        }

        this.props.del.forEach(w => {
            this.props.deleteWord(w)
        })

        this.props.editWorksheet(value)
    }

    addDelete(id) {
        if (!id) return
        
        let del = this.props.del.push(id)
        this.props.updateDelete(del)
    }

    render() {
        return this.props.worksheet ? 
            <Worksheet
                router={this.props.router}
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

const mapStateToProps = ({ app, editor }) => ({
    worksheet: app.get("worksheet"),
    del: editor.get("del")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id)),
    editWord: (word) => dispatch(editWord(word)),
    createWord: (word) => dispatch(createWord(word)),
    deleteWord: (word) => dispatch(deleteWord(word)),
    editWorksheet: (worksheet) => dispatch(editWorksheet(worksheet)),
    updateDelete: (id) => dispatch(updateDelete(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorksheetEditor)
