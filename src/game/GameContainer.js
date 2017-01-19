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
        if (this.props.mode === "easy") {
            return (
                <TranslatorContainer />
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
        if (mode === this.props.mode) {
            return "default"
        }

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
            <Game id={this.props.worksheet.id} 
            theme={this.props.worksheet.name} 
            fn={{changeMode: this.changeMode, getMode: this.getMode, getModeClass: this.getModeClass}} />
        )
    }
}

function mapStateToProps(state) {
    const { gameReducer } = state

    console.log(gameReducer.worksheet)

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
