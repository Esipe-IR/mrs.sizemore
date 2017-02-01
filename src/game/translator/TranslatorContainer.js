import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'

import { updateWord, updateInput, updateResult } from './duck'
import { keyboardState } from '../../keyboard/duck'

class TranslatorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.randomWord = this.randomWord.bind(this)
        this.formatInput = this.formatInput.bind(this)
        this.checkResult = this.checkResult.bind(this)
    }

    componentDidMount() {
        this.randomWord()
    }

    randomWord() {
        let word = new Map()

        if (this.props.words.size) {
            let min = Math.ceil(0)
            let max = Math.floor(this.props.words.size - 1)
            let random = Math.floor(Math.random() * (max - min + 1)) + min
            
            word = this.props.words.get(random)

            if (this.props.word && this.props.word.equals(word)) {
                if (random + 1 < this.props.words.size - 1) word = this.props.words.get(random + 1)
                if (random - 1 > -1) word =this.props.words.get(random - 1)    
            }
        }

        this.props.updateWord(word)
    }

    formatInput(e) {
        this.props.updateInput(e.target.value.toLowerCase().trim())
    }

    checkResult(e) {
        e.preventDefault()

        let status = true
        let msg = "Great job!"
        let en = this.props.word.get("en")

        if (this.props.input !== en) {
            status = false
            msg = "Wrong! The correct answer for '" + this.props.word.get("fr") + "' is: '" + en + "' not: '" + this.props.input + "'"
        }

        this.props.updateResult(status, msg)
        this.randomWord()
    }

    render() {
        return this.props.word ? <Translator {...this.props} checkResult={this.checkResult} formatInput={this.formatInput}/> : null
    }
}

const mapStateToProps = ({ translatorReducer, keyboardReducer }) => ({
    word: translatorReducer.get("word"),
    input: translatorReducer.get("input"),
    result: translatorReducer.get("result"),
    resultMsg: translatorReducer.get("resultMsg"),
    switch: keyboardReducer.open
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateWord: (word) => dispatch(updateWord(word)),
    updateInput: (word) => dispatch(updateInput(word)),
    updateResult: (status, msg) => dispatch(updateResult(status, msg)),
    switchUpdate: (s) => () => dispatch(keyboardState(!s)),
})

TranslatorContainer.propTypes = {
    word: PropTypes.object,
    input: PropTypes.string,
    result: PropTypes.bool,
    resultMsg: PropTypes.string,
    switch: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorContainer)
