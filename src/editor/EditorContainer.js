import React from 'react'
import { connect } from 'react-redux'
import EditorWorksheet from './component/EditorWorksheet'
import { fetchWorksheet } from './duck'
import { changeInput, saveInput } from './duck'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.props.dispatch(fetchWorksheet(this.props.params.id))
    }

    onChange(e) {
        let data = e.target.id
        let value = e.target.value
    
        this.props.dispatch(changeInput(data, value, this.props.worksheet))
    }

    onClick(e) {
        e.preventDefault()
        this.props.dispatch(saveInput(this.props.worksheet))
    }

    render() {
        if (this.props.params.type === "word") {
            return null
        }

        return (
            <EditorWorksheet worksheet={this.props.worksheet} words={this.props.words} onClick={this.onClick} onChange={this.onChange}/>
        )
    }
}

function mapStateToProps(state) {
    const { editorReducer } = state

    return {
        worksheet: editorReducer.worksheet,
        words: editorReducer.words
    }
}

export default connect(mapStateToProps)(EditorContainer)
