import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizz } from '../actions'

import Text from './Text'
import Help from './Help'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchQuizz(this.props.params.sheet));
    }

    render() {
        const {app, api} = this.props

        return (
            <div className="game">
                <h2>Worksheet: {api.worksheet}</h2>
                <em>Theme: {api.theme}</em>

                <p>Count: {app.wordcount}/{api.words.length}</p>
                <Text examples={api.examples} definitions={api.definitions} />
                <Help definitions={api.words} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { apiReducer, appReducer } = state

    return {
        app: appReducer,
        api: apiReducer
    }
}

Game.propTypes = {
    app: PropTypes.object,
    api: PropTypes.object,
}

export default connect(mapStateToProps)(Game)
