import React from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import Word from './component/Word'
import { fetchDefinitions, fetchSentences, updateTips, wordSelector } from '../duck'
import { fetchWord, editWord } from '../../app/duck'

class WordEditor extends React.Component {
    componentDidMount() {
        this.props.fetchWord(this.props.params.id)
    }

    submitTips(values) {
        if (values.definition) {
            this.props.updateField("definition", values.definition)
            this.props.updateTips(this.props.tips.set("show", false))
            
            return
        }

        let keys = Object.keys(values)
        var sentences = this.props.mutable_sentences

        if (!sentences) sentences = []

        keys.forEach((k, i) => {
            if (k.indexOf("sentences") === -1) return

            let arr = k.split("_")
            let id = arr[1]

            if (!this.props.tips.get("body")[id].text) return

            let txt = this.props.tips.get("body")[id].text
            txt = txt.replace(this.props.mutable_en, "[x]")

            sentences.push(txt)
        })

        this.props.updateField("sentences", sentences)
        this.props.updateTips(this.props.tips.set("show", false))
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
    mutable_en: React.PropTypes.string,
    mutable_sentences: React.PropTypes.array
}

const mapStateToProps = ({ appReducer, editorReducer, form }) => ({
    word: appReducer.get("word"),
    tips: editorReducer.get("tips"),
    mutable_en: wordSelector({form}, 'en'),
    mutable_sentences: wordSelector({form}, 'sentences')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTips: (tips) => dispatch(updateTips(tips)),
    fetchDefinitions: (word) => dispatch(fetchDefinitions(word)),
    fetchSentences: (word) => dispatch(fetchSentences(word)),
    fetchWord: (id) => dispatch(fetchWord(id)),
    editWord: (word) => dispatch(editWord(word)),
    updateField: (field, value) => dispatch(change("word_editor", field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(WordEditor)
