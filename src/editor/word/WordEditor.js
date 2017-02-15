import React from 'react'
import { connect } from 'react-redux'
import Word from './component/Word'
import { fetchDefinitions, fetchExamples, updateTips, wordSelector } from '../duck'
import { fetchWord, editWord } from '../../app/duck'

class WordEditor extends React.Component {
    componentDidMount() {
        this.props.fetchWord(this.props.params.id)
    }

    submitTips(values) {
        console.log(values)
    }

    render() {
        return this.props.word ?
            <Word
                {...this.props}
                submitTips={this.submitTips.bind(this)}
                onSubmit={this.props.editWord} 
                initialValues={this.props.word.toJS()} />
            :
            null
    }
}

WordEditor.propTypes = {
    word: React.PropTypes.object,
    tips: React.PropTypes.object,
    mutable_en: React.PropTypes.string
}

const mapStateToProps = ({ appReducer, editorReducer, form }) => ({
    word: appReducer.get("word"),
    tips: editorReducer.get("tips"),
    mutable_en: wordSelector({form}, 'en')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTips: (tips) => dispatch(updateTips(tips)),
    fetchDefinitions: (word) => dispatch(fetchDefinitions(word)),
    fetchExamples: (word) => dispatch(fetchExamples(word)),
    fetchWord: (id) => dispatch(fetchWord(id)),
    editWord: (word) => dispatch(editWord(word))
})

export default connect(mapStateToProps, mapDispatchToProps)(WordEditor)
