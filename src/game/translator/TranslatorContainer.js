import React from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'
import { updateFormerWord, updateInput, updateResult, getRandomWord } from './duck'
import { updateStatus } from '../../keyboard/duck'

class TranslatorContainer extends React.Component {
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

        this.props.updateFormerWord(this.props.word)
        this.props.updateResult(status, msg)
    }

    render() {
        return this.props.word ? 
            <Translator {...this.props} checkResult={this.checkResult.bind(this)} formatInput={this.formatInput.bind(this)}/> 
                : 
            null
    }
}

TranslatorContainer.propTypes = {
    word: React.PropTypes.object,
    input: React.PropTypes.string,
    result: React.PropTypes.bool,
    resultMsg: React.PropTypes.string,
    switch: React.PropTypes.bool
}

const mapStateToProps = ({ appReducer, translatorReducer, keyboardReducer }) => ({
    word: getRandomWord({appReducer, translatorReducer}),
    input: translatorReducer.get("input"),
    result: translatorReducer.get("result"),
    resultMsg: translatorReducer.get("resultMsg"),
    switch: keyboardReducer.get("status")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateFormerWord: (former) => dispatch(updateFormerWord(former)),
    updateInput: (input) => dispatch(updateInput(input)),
    updateResult: (status, msg) => dispatch(updateResult(status, msg)),
    switchUpdate: (s) => () => dispatch(updateStatus(!s)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorContainer)
