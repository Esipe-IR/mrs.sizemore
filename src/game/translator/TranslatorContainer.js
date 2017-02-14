import React from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'
import { updateWord, updateInput, updateResult, updateScore } from './duck'
import { updateStatus } from '../../keyboard/duck'
import { getRandom } from '../../services/obj'

class TranslatorContainer extends React.Component {
    componentDidMount() {
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

        let status, msg
        let score = this.props.score
        let en = this.props.word.get("en")

        if (this.props.input === en) {
            status = true
            msg = "Great job!"
            score++
        } else {
            status = false
            msg = "Wrong! The correct answer for '" + this.props.word.get("fr") + "' is: '" + en + "' not: '" + this.props.input + "'"
        }

        this.props.updateResult(status, msg)
        this.props.updateScore(score)
        this.randomWord()
    }

    toggleSwitch() {
        this.props.updateSwitch(!this.props.switch)
    }

    render() {
        return this.props.word ? 
            <Translator {...this.props} 
                checkResult={this.checkResult.bind(this)} 
                formatInput={this.formatInput.bind(this)}
                toggleSwitch={this.toggleSwitch.bind(this)}/> 
                : 
            null
    }
}

TranslatorContainer.propTypes = {
    words: React.PropTypes.object,
    word: React.PropTypes.object,
    input: React.PropTypes.string,
    result: React.PropTypes.bool,
    resultMsg: React.PropTypes.string,
    switch: React.PropTypes.bool,
    score: React.PropTypes.number
}

const mapStateToProps = ({ appReducer, translatorReducer, keyboardReducer }) => ({
    words: appReducer.get("worksheet").get("words"),
    word: translatorReducer.get("word"),
    input: translatorReducer.get("input"),
    result: translatorReducer.get("result"),
    resultMsg: translatorReducer.get("resultMsg"),
    switch: keyboardReducer.get("status"),
    score: translatorReducer.get("score")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateWord: (word) => dispatch(updateWord(word)),
    updateInput: (input) => dispatch(updateInput(input)),
    updateResult: (status, msg) => dispatch(updateResult(status, msg)),
    updateSwitch: (status) => dispatch(updateStatus(status)),
    updateScore: (score) => dispatch(updateScore(score))
})

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorContainer)
