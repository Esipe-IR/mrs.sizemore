import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'

import { inputChange, translateResponse, newWord } from './duck'
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

        const { word, userWord, dispatch } = this.props
        
        if (userWord === word.en) {
            return dispatch(translateResponse(true, "Great job!", word.id))
        }

        let msg = "Wrong! The correct answer for '" + word.fr + "' is: '" + word.en + "' not: '" + userWord + "'"
        dispatch(translateResponse(false, msg, word.id))
    }

    switch() {
        this.props.dispatch(keyboardState(!this.props.switch))
    }

    getWord() {
        this.props.dispatch(newWord(this.props.words))
    }

    render() {
        return (
            <Translator result={this.props.result} word={this.props.word} 
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
        userWord: translatorReducer.userWord,
        switch: keyboardReducer.open
    }
}

TranslatorContainer.propTypes = {
    result: PropTypes.object,
    word: PropTypes.object.isRequired,
    userWord: PropTypes.string.isRequired,
    switch: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(TranslatorContainer)
