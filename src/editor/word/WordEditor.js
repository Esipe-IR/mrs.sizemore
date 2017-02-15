import React from 'react'
import { connect } from 'react-redux'
import Word from './component/Word'
import { fetchDefinitions, fetchExamples } from '../duck'
import { fetchWord, editWord } from '../../app/duck'

class WordEditor extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWord(this.props.params.id))
    }

    onSubmit(value) {
        this.props.dispatch(editWord(value))
    }

    clickDefinition() {
        this.props.dispatch(fetchDefinitions(this.props.word.get("en")))
    }

    clickExample() {
        this.props.dispatch(fetchExamples(this.props.word.get("en")))
    }

    render() {
        return this.props.word ?
            <Word 
                onSubmit={this.onSubmit.bind(this)} 
                clickDefinition={this.clickDefinition.bind(this)}
                clickExample={this.clickExample.bind(this)}
                initialValues={this.props.word.toJS()} />
            :
            null
    }
}

WordEditor.propTypes = {
    word: React.PropTypes.object
}

const mapStateToProps = ({ appReducer }) => ({
    word: appReducer.get("word")
})

export default connect(mapStateToProps)(WordEditor)
