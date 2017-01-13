import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizz } from '../actions'

import WordCount from './WordCount'
import Text from './Text'
import Resume from './Resume'

let i = [{w: "toto", try: 2}]

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchQuizz("instructor"));
    }

    render() {
        const {
            theme,
            wordcount, 
            worksheet, 
            json, 
            err
        } = this.props

        return (
            <div className="game">
                <h2>Worksheet: {worksheet}</h2>
                <em>Theme: {theme}</em>

                <WordCount count={wordcount}/>
                <Text err={err} json={json} />
                <Resume items={i} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { apiReducer } = state

    let data;

    if (apiReducer.json) {
        data = JSON.parse(apiReducer.json)
    }

    return {
        wordcount: 0,
        worksheet: "4, 5, 6",
        theme: "School",
        json: data,
        err: apiReducer.err
    }
}

Game.propTypes = {
    json: PropTypes.object,
    err: PropTypes.string
}

export default connect(mapStateToProps)(Game)
