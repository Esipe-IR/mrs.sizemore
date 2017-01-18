import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Game from '../components/pages/Game'
import { fetchWorksheet } from '../actions'

import TranslatorContainer from './TranslatorContainer'

class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getMode = this.getMode.bind(this)
        this.props.dispatch(fetchWorksheet(this.props.params.sheet))
    }

    getMode() {
        if (this.props.mode === "easy") {
            return (
                <TranslatorContainer />
            )
        } else if (this.props.mode === "normal") {
            return null
        }

        //{<p>Count: {app.wordcount}/{api.words.length}</p>}

        /*
        return (
            <Fillgap examples={this.props.api.examples} definitions={this.props.api.definitions} />
        )
        */

        return null
    }

    changeMode(mode) {
        //Got to dispatch
    }

    render() {
        return (
            <Game id={this.props.worksheet.id} theme={this.props.worksheet.theme} getMode={this.getMode} />
        )
    }
}

function mapStateToProps(state) {
    const { gameReducer } = state

    console.log(gameReducer)

    return {
        mode: gameReducer.mode,
        worksheet: gameReducer.worksheet
    }
}

GameContainer.propTypes = {
    mode: PropTypes.string.isRequired,
    worksheet: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(GameContainer)
