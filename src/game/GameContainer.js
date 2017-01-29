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
        this.props.dispatch(fetchWorksheet(this.props.params.sheet))
    }

    getMode() {
        if (!this.props.worksheet.state) {
            return null
        }
        
        if (this.props.mode === 0) {
            return (
                <TranslatorContainer words={this.props.words} />
            )
        } else if (this.props.mode === 1) {
            return null
        }
    
        return (
            <FillgapContainer />
        )
    }

    changeMode(e) {
        let mode = parseInt(e.target.dataset.mode, 3)
        this.props.dispatch(changeMode(mode))
    }

    render() {
        return (
            <Game
                mode={this.props.mode}
                worksheet={this.props.worksheet}
                answer={this.props.answer}
                fn={
                    {
                        changeMode: this.changeMode,
                        getMode: this.getMode
                    }
                }
            />
        )
    }
}

function mapStateToProps(state) {
    const { gameReducer } = state

    return {
        mode: gameReducer.mode,
        worksheet: gameReducer.worksheet,
        words: gameReducer.words,
        answer: gameReducer.answer
    }
}

GameContainer.propTypes = {
    mode: PropTypes.number.isRequired,
    worksheet: PropTypes.object.isRequired,
    words: PropTypes.object.isRequired,
    answer: PropTypes.array
}

export default connect(mapStateToProps)(GameContainer)
