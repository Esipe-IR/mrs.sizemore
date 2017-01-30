import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'

import { inputChange, wordResult, wordNew } from './duck'
import { keyboardState } from '../../keyboard/duck'

class TranslatorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.handleResult = this.handleResult.bind(this)
        this.switch = this.switch.bind(this)
        this.getWord = this.getWord.bind(this)
        this.getWord()
    }

    onChange(e) {
        let input = e.target.value
        input = input.toLowerCase().trim()

        this.props.dispatch(inputChange(input))
    }

    handleResult(e) {
        e.preventDefault()
        this.props.dispatch(wordResult(this.props.word, this.props.userWord))
        this.getWord()
    }

    switch() {
        this.props.dispatch(keyboardState(!this.props.switch))
    }

    getWord() {
        this.props.dispatch(wordNew(this.props.words))
    }

    render() {
        return (
            <Translator result={this.props.result} resultMsg={this.props.resultMsg} word={this.props.word} 
                userWord={this.props.userWord}
                sw={this.props.switch}
                fn={
                    {
                        onChange: this.onChange,
                        handleResult: this.handleResult,
                        switch: this.switch
                    }
                } 
            />
        )
    }
}

const mapStateToProps = (state) => {
    const { translatorReducer, keyboardReducer } = state

    return {
        word: translatorReducer.word,
        result: translatorReducer.result,
        resultMsg: translatorReducer.resultMsg,
        userWord: translatorReducer.userWord,
        switch: keyboardReducer.open
    }
}

TranslatorContainer.propTypes = {
    result: PropTypes.bool,
    resultMsg: PropTypes.string,
    word: PropTypes.object.isRequired,
    userWord: PropTypes.string.isRequired,
    switch: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(TranslatorContainer)
