import React from 'react'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'
import { List, Map } from 'immutable'
import Translator from './component/Translator'
import { updateWord, updateHistory, updateInput, updateScore } from './duck'
import { getRandom } from '../../services/obj'

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
        this.props.updateInput(e.target.value.toLowerCase().trim())
    }

    checkResult(e) {
        e.preventDefault()
        window.FB.AppEvents.logEvent("translatorSubmit")

        let status = "success",
            title  = "Great job!",
            msg    = "Are you a champion ?",
            score  = this.props.score + 1,
            en     = this.props.word.get("en"),
            history = this.props.history

        if (this.props.input !== en) {
            status = "error"
            title  = "Wrong!"
            score -= 2

            if (this.props.input === "") {
                msg = "The correct answer for \"" + this.props.word.get("fr") + "\" is \"" + en + "\" not empty"
            } else {
                msg = "The correct answer for \"" + this.props.word.get("fr") + "\" is \"" + en + "\" not \"" + this.props.input + "\""
            }
        }

        this.props.updateNotify({
            title: title,
            message: msg,
            status: status,
            dismissible: true,
            dismissAfter: 2000
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
    words: React.PropTypes.object,
    word: React.PropTypes.object,
    history: React.PropTypes.object,
    input: React.PropTypes.string,
    score: React.PropTypes.number
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
