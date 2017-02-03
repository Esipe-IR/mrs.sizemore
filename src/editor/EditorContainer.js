import React from 'react'
import { connect } from 'react-redux'
import EditorWord from './component/EditorWord'
import EditorWorksheet from './component/EditorWorksheet'
import { fetchWorksheet, fetchWord } from '../app/duck'
import { addChild, editChild, deleteChild, updateChild, createWord } from './duck'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getCurrent = this.getCurrent.bind(this)
        this.addWord = this.addWord.bind(this)
        this.addChild = this.addChild.bind(this)
        this.editChild = this.editChild.bind(this)
        this.deleteChild = this.deleteChild.bind(this)
        this.saveChild = this.saveChild.bind(this)
    }

    componentDidMount() {
        if (this.props.params.type === "worksheet") {
            this.props.dispatch(fetchWorksheet(this.props.params.id))
        } else {
            this.props.dispatch(fetchWord(this.props.params.id))
        }
    }

    getCurrent() {
        return {
            worksheet: this.props.worksheet,
            words: this.props.words,
            word: this.props.word
        }
    }

    addWord(e) {
        e.preventDefault()
        let word = this.props.word
        word.worksheet = this.props.params.id

        this.props.dispatch(createWord(word))
    }

    addChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let value = e.target.dataset.value
        let state = this.getCurrent()

        this.props.dispatch(addChild(name, value, state))
    }

    editChild(e) {
        e.preventDefault()
        let name = e.target.id
        let value = e.target.value
        let state = this.getCurrent()
    
        this.props.dispatch(editChild(name, value, state))
    }

    deleteChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let state = this.getCurrent()

        this.props.dispatch(deleteChild(name, state))
    }

    saveChild(e) {
        e.preventDefault()
        let id = "/" + this.props.params.type + "s/" + this.props.params.id
        let obj = this.getCurrent()[this.props.params.type]

        this.props.dispatch(updateChild(id, obj))
    }

    render() {
        if (this.props.params.type === "worksheet" && this.props.worksheet) {
            return <EditorWorksheet
                    worksheet={this.props.worksheet}
                    word={this.props.word}
                    addWord={this.addWord}
                    editChild={this.editChild}
                    saveChild={this.saveChild}
                    error={this.props.error}
                    errorMsg={this.props.errorMsg} />
        }

        if (this.props.word) {
            return <EditorWord 
                    word={this.props.word} 
                    addChild={this.addChild} 
                    editChild={this.editChild}
                    deleteChild={this.deleteChild}
                    saveChild={this.saveChild}
                    error={this.props.error}
                    errorMsg={this.props.errorMsg} />
        }

        return null
    }
}

const mapStateToProps = ({appReducer, editorReducer}) => ({
    worksheet: appReducer.get("worksheet"),
    word: appReducer.get("word"),
    error: editorReducer.error,
    errorMsg: editorReducer.errorMsg
})

export default connect(mapStateToProps)(EditorContainer)
