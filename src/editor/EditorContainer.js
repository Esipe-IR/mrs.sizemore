import React from 'react'
import { connect } from 'react-redux'
import Editor from './component/Editor'
import { fetchWorksheet } from './duck'
import { changeInput, saveInput } from './duck'

class EditorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.props.dispatch(fetchWorksheet(this.props.params.sheet))
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
        return (
            <Editor worksheet={this.props.worksheet} onClick={this.onClick} onChange={this.onChange}/>
        )
    }
}

function mapStateToProps(state) {
    const { editorReducer } = state

    return {
        worksheet: editorReducer.worksheet
    }
}

export default connect(mapStateToProps)(EditorContainer)
