import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizz } from '../actions'

import Text from './Text'
import Help from './Help'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchQuizz());
    }

    render() {
        const {
            theme,
            worksheet,
            examples,
            definitions,
            words
        } = this.props

        return (
            <div className="game">
                <h2>Worksheet: {worksheet}</h2>
                <em>Theme: {theme}</em>

                <Text examples={examples} definitions={definitions} />
                <Help definitions={words} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { apiReducer } = state
    let json, err, words, examples, definitions;

    if (apiReducer.payload) {
        if (apiReducer.error) {
            err = apiReducer.payload
        } else {
            json = JSON.parse(apiReducer.payload)
            words = json.words
            examples = json.examples
            definitions = json.definitions
        }
    }

    return {
        worksheet: "4",
        theme: "School",
        words: words,
        examples: examples,
        definitions: definitions,
        err: err
    }
}

Game.propTypes = {
    json: PropTypes.object,
    err: PropTypes.string
}

export default connect(mapStateToProps)(Game)
