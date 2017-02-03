import React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import EditorWord from './component/EditorWord'
import EditorWorksheet from './component/EditorWorksheet'

import { fetchWorksheet, updateWorksheet } from '../app/duck'
import { fetchWord, updateChild, createWord, updateWord } from './duck'

import { addKey, editKey, deleteKey } from '../services/obj'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getCurrentAction = this.getCurrentAction.bind(this)
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

    getCurrentAction(type) {
        if (type === "worksheet") {
            return updateWorksheet
        }

        return updateWord
    }

    addWord(e) {
        e.preventDefault()
        let word = this.props.word
        word = word.set("worksheet", this.props.params.id)

        this.props.dispatch(createWord(word))
    }

    addChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let value = e.target.dataset.value
        let pathArr = name.split("/")

        let last = addKey(pathArr.slice(1, pathArr.length), value, this.props[pathArr[0]])

        this.props.dispatch(this.getCurrentAction(pathArr[0])(fromJS(last)))
    }

    editChild(e) {
        e.preventDefault()
        let name = e.target.id
        let value = e.target.value
        let pathArr = name.split("/")

        let last = editKey(pathArr.slice(1, pathArr.length), value, this.props[pathArr[0]])
    
        this.props.dispatch(this.getCurrentAction(pathArr[0])(fromJS(last)))
    }

    deleteChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let pathArr = name.split("/")

        let last = deleteKey(pathArr.slice(1, pathArr.length), this.props[pathArr[0]])

        this.props.dispatch(this.getCurrentAction(pathArr[0])(last))
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
                    saveChild={this.saveChild} />
        }

        if (this.props.word) {
            return <EditorWord 
                    word={this.props.word} 
                    addChild={this.addChild} 
                    editChild={this.editChild}
                    deleteChild={this.deleteChild}
                    saveChild={this.saveChild} />
        }

        return null
    }
}

EditorContainer.propTypes = {
    worksheet: React.PropTypes.object,
    word: React.PropTypes.object
}

const mapStateToProps = ({appReducer, editorReducer}) => ({
    worksheet: appReducer.get("worksheet"),
    word: editorReducer.get("word")
})

export default connect(mapStateToProps)(EditorContainer)
