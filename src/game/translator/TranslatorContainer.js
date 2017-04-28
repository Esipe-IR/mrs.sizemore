import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'
import { List, Map } from 'immutable'
import Translator from './component/Translator'
import { updateWord, updateHistory, updateInput, updateScore } from './duck'
import { getRandom } from '../../services/obj'
import { logEvent } from '../../services/analytics'

class TranslatorContainer extends React.Component {
    componentDidMount() {
        if (!this.props.words) this.fetchWords()
        this.randomWord()
    }

    randomWord() {
        let word = new Map()

        if (this.props.words.size) {
            let random = getRandom(this.props.words.size)
            word = this.props.words.get(random)

            if (this.props.word && this.props.word.equals(word)) {
                return this.randomWord()
            }
        }

        this.props.updateWord(word)
    }

    formatInput(e) {
        this.props.updateInput(e.target.value.toLowerCase())
    }

    checkResult(e) {
        e.preventDefault()

        let status = "success",
            title  = "Right!",
            msg    = "Great job!",
            score  = this.props.score + 1,
            en     = this.props.word.get("en"),
            history = this.props.history

        if (this.props.input.trim() !== en.trim()) {
            status = "error"
            title  = "Wrong!"
            score -= 2

            logEvent("translatorSubmitFail", score, {word: this.props.word.get("en"), usrWord: this.props.input})

            if (this.props.input === "") {
                msg = "\"" + this.props.word.get("fr") + "\" = \"" + en + "\""
            } else {
                msg = "\"" + this.props.word.get("fr") + "\" = \"" + en + "\""
            }
        } else {
            logEvent("translatorSubmitSuccess", score, {word: this.props.word.get("en"), usrWord: this.props.input})
        }

        this.props.updateNotify({
            title: title,
            message: msg,
            status: status,
            dismissAfter: 4000,
            dismissible: true
        })

        if (!history) {
            history = List()
        } else if (history.size > 4) {
            history = history.shift()
        }

        history = history.push(Map({
            en: this.props.word.get("en"),
            fr: this.props.word.get("fr"),
            status: status
        }))

        this.props.updateHistory(history)
        this.props.updateInput("")
        this.props.updateScore(score)
        this.randomWord()
    }

    render() {
        return this.props.word ? 
            <Translator {...this.props} 
                checkResult={this.checkResult.bind(this)} 
                formatInput={this.formatInput.bind(this)}/> 
                : 
            null
    }
}

TranslatorContainer.propTypes = {
    words: PropTypes.object,
    word: PropTypes.object,
    history: PropTypes.object,
    input: PropTypes.string,
    score: PropTypes.number
}

const mapStateToProps = ({ firebase, translator }) => ({
    words: firebase.get("worksheet").get("words"),
    word: translator.get("word"),
    history: translator.get("history"),
    input: translator.get("input"),
    score: translator.get("score")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateWord: (word) => dispatch(updateWord(word)),
    updateHistory: (history) => dispatch(updateHistory(history)),
    updateInput: (input) => dispatch(updateInput(input)),
    updateScore: (score) => dispatch(updateScore(score)),
    updateNotify: (options) => dispatch(notify(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorContainer)
