import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'

import { inputChange, wordResult, wordNew } from './duck'
import { keyboardState } from '../../keyboard/duck'

class TranslatorContainer extends React.Component {
    componentDidMount() {
        this.props.wordGenerate()
    }

    render() {
        return this.props.word ? <Translator {...this.props}/> : null
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    wordUpdate: (e) => dispatch(inputChange(e.target.value.toLowerCase().trim())),
    wordCheck: (w, uw) => dispatch(wordResult(w, uw)),
    switchUpdate: (s) => dispatch(keyboardState(!s)),
    wordGenerate: () => dispatch(wordNew(ownProps.words))
})

TranslatorContainer.propTypes = {
    result: PropTypes.bool,
    resultMsg: PropTypes.string,
    word: PropTypes.object,
    userWord: PropTypes.string.isRequired,
    switch: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorContainer)
