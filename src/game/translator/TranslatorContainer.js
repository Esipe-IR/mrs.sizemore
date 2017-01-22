import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Translator from './component/Translator'

import { translateResponse, switchState } from './duck'

class TranslatorContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleResult = this.handleResult.bind(this)
        this.switch = this.switch.bind(this)
    }

    handleResult(e) {
        e.preventDefault()

        const { word, dispatch } = this.props

        let input = e.target[1].value
        let userVal = input.toLowerCase().trim()
        
        if (userVal === word.en) {
            return dispatch(translateResponse(true, "Great job!", word.id))
        }

        let msg = "Wrong! The correct answer for '" + word.fr + "' is: '" + word.en + "' not: '" + userVal + "'"
        dispatch(translateResponse(false, msg, word.id))
    }

    switch() {
        this.props.dispatch(switchState(!this.props.switch))
    }

    render() {
        return (
            <Translator result={this.props.result} word={this.props.word} 
            fn={{
                    handleResult: this.handleResult,
                    switch: this.switch
                }
            }
            sw={this.props.switch} />
        )
    }
}

const mapStateToProps = (state) => {
    const { translatorReducer } = state

    return {
        switch: translatorReducer.switch,
        result: translatorReducer.result,
        word: {
            id: 11,
            fr: "test",
            en: "test"
        }
    }
}

TranslatorContainer.propTypes = {
    result: PropTypes.object,
    word: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(TranslatorContainer)
