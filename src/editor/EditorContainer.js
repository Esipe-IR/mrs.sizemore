import React from 'react'
import { connect } from 'react-redux'
import EditorWord from './component/EditorWord'
import EditorWorksheet from './component/EditorWorksheet'
import { fetchWorksheet, fetchWord, addChild, editChild, deleteChild, saveChild, WORKSHEET_UPDATE, WORD_UPDATE } from './duck'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getCurrent = this.getCurrent.bind(this)
        this.addChild = this.addChild.bind(this)
        this.editChild = this.editChild.bind(this)
        this.deleteChild = this.deleteChild.bind(this)
        this.saveChild = this.saveChild.bind(this)

        if (this.props.params.type === "worksheet") {
            this.props.dispatch(fetchWorksheet(this.props.params.id))
        } else {
            this.props.dispatch(fetchWord(this.props.params.id))
        }
    }

    getCurrent() {
        return (this.props.params.type === "worksheet" ? this.props.worksheet : this.props.word)
    }

    addChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let value = e.target.dataset.value
        let obj = this.getCurrent()
        let type = this.props.params.type === "worksheet" ? WORKSHEET_UPDATE : WORD_UPDATE

        this.props.dispatch(addChild(name, value, obj, type))
    }

    editChild(e) {
        e.preventDefault()
        let name = e.target.id
        let value = e.target.value
        let obj = this.getCurrent()
        let type = this.props.params.type === "worksheet" ? WORKSHEET_UPDATE : WORD_UPDATE
    
        this.props.dispatch(editChild(name, value, obj, type))
    }

    deleteChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let obj = this.getCurrent()
        let type = this.props.params.type === "worksheet" ? WORKSHEET_UPDATE : WORD_UPDATE

        this.props.dispatch(deleteChild(name, obj, type))
    }

    saveChild(e) {
        e.preventDefault()
        this.props.dispatch(saveChild(this.props.params.id, this.getCurrent()))
    }

    render() {
        if (this.props.params.type === "worksheet") {
            return <EditorWorksheet 
                    worksheet={this.props.worksheet} 
                    words={this.props.words} 
                    editChild={this.editChild}
                    saveChild={this.saveChild} />
        }

        return <EditorWord 
                word={this.props.word} 
                addChild={this.addChild} 
                editChild={this.editChild}
                deleteChild={this.deleteChild}
                saveChild={this.saveChild} />
    }
}

function mapStateToProps(state) {
    const { editorReducer } = state

    return {
        worksheet: editorReducer.worksheet,
        words: editorReducer.words,
        word: editorReducer.word
    }
}

export default connect(mapStateToProps)(EditorContainer)
