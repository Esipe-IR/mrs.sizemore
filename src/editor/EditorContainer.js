import React from 'react'
import { connect } from 'react-redux'
import Editor from './component/Editor'
import { fetchWorksheet, updateWorksheet } from '../app/duck'
import { 
    fetchWord, 
    saveChild, 
    createWord, 
    deleteWord, 
    updateWord,
    updateIsUpdate, 
    updateModal, 
    updateDeleteId, 
    resetWord } from './duck'
import { addKey, editKey, deleteKey } from '../services/obj'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getCurrentAction = this.getCurrentAction.bind(this)
        this.addWord = this.addWord.bind(this)
        this.deleteWord = this.deleteWord.bind(this)
        this.addChild = this.addChild.bind(this)
        this.editChild = this.editChild.bind(this)
        this.deleteChild = this.deleteChild.bind(this)
        this.saveChild = this.saveChild.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.updateDeleteId = this.updateDeleteId.bind(this)
    }

    componentDidMount() {
        if (this.props.params.type === "worksheet") {
            this.props.dispatch(fetchWorksheet(this.props.params.id))
        } else {
            this.props.dispatch(fetchWord(this.props.params.id))
        }
    }

    componentDidUpdate() {
        if (this.props.isUpdate === true) {
            window.scrollTo(-300, -300)
            this.props.dispatch(updateIsUpdate(false))
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

        this.props.dispatch(createWord(word, this.props.worksheet))
        this.props.dispatch(resetWord())
    }

    deleteWord(e) {
        e.preventDefault()
        let i
        let words = this.props.worksheet.get("words")

        for (i = 0; i < words.size; i++) {
            if ("/words/" + words.get(i).get("id") === this.props.deleteId) {
                break
            }
        }

        let last = deleteKey(["words", i], this.props.worksheet)
        this.props.dispatch(updateWorksheet(last))

        this.props.dispatch(deleteWord(this.props.deleteId, null))
    }

    addChild(e) {
        e.preventDefault()
        let name = e.target.dataset.child
        let value = ""
        let pathArr = name.split("/")

        let last = addKey(pathArr.slice(1, pathArr.length), value, this.props[pathArr[0]])

        this.props.dispatch(this.getCurrentAction(pathArr[0])(last))
    }

    editChild(e) {
        e.preventDefault()
        let name = e.target.id
        let value = e.target.value
        let pathArr = name.split("/")

        let last = editKey(pathArr.slice(1, pathArr.length), value, this.props[pathArr[0]])
    
        this.props.dispatch(this.getCurrentAction(pathArr[0])(last))
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
        let obj = this.props[this.props.params.type]

        this.props.dispatch(saveChild(id, obj))
    }

    toggleModal(status) {
        let dispatch = this.props.dispatch

        return (e) => {
            e.preventDefault()

            dispatch(updateModal(status))
        }        
    }

    updateDeleteId(e) {
        let id = e.target.id

        this.props.dispatch(updateDeleteId(id))
    }

    render() {
        return this.props.worksheet ? <Editor {...this.props}/> : null
    }
}

EditorContainer.propTypes = {
    worksheet: React.PropTypes.object,
    word: React.PropTypes.object,
    isUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool,
    deleteId: React.PropTypes.string
}

const mapStateToProps = ({appReducer, editorReducer}) => ({
    worksheet: appReducer.get("worksheet"),
    word: editorReducer.get("word"),
    isUpdate: editorReducer.get("isUpdate"),
    modal: editorReducer.get("modal"),
    deleteId: editorReducer.get("deleteId")
})

export default connect(mapStateToProps)(EditorContainer)
