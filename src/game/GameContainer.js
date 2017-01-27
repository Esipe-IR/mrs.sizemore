import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet, changeMode } from './duck'

import TranslatorContainer from './translator/TranslatorContainer'
import FillgapContainer from './fillgap/FillgapContainer'

class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getMode = this.getMode.bind(this)
        this.changeMode = this.changeMode.bind(this)
        this.getModeClass = this.getModeClass.bind(this)
        this.props.dispatch(fetchWorksheet(this.props.params.sheet))
    }

    getMode() {
        if (!this.props.worksheet.state) {
            return null
        }
        
        if (this.props.mode === "easy") {
            return (
                <TranslatorContainer words={this.props.words} />
            )
        } else if (this.props.mode === "normal") {
            return null
        }
    
        return (
            <FillgapContainer />
        )
    }

    changeMode(e) {
        let mode = e.target.dataset.mode
        this.props.dispatch(changeMode(mode))
    }

    getModeClass(mode) {
        if (mode === "easy") {
            return "success"
        }

        if (mode === "normal") {
            return "warning"
        }

        return "danger"
    }

    render() {
        return (
            <Game
            worksheet={this.props.worksheet}
            fn={
                {
                    changeMode: this.changeMode,
                    getMode: this.getMode,
                    getModeClass: this.getModeClass
                }
            } />
        )
    }
}

function mapStateToProps(state) {
    const { gameReducer } = state

    return {
        mode: gameReducer.mode,
        worksheet: gameReducer.worksheet,
        words: gameReducer.words
    }
}

GameContainer.propTypes = {
    mode: PropTypes.string.isRequired,
    worksheet: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(GameContainer)
