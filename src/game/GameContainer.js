import React from 'react'
import { connect } from 'react-redux'

import Game from './component/Game'
import TranslatorContainer from './translator/TranslatorContainer'
import FillgapContainer from './fillgap/FillgapContainer'

import { fetchWorksheet } from '../app/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getMode = this.getMode.bind(this)
    }

    componentDidMount() {
        this.props.getWorksheet(this.props.params.id)
    }

    getMode() {
        if (!this.props.worksheet) return null
        
        if (this.props.mode === 0) {
            return <TranslatorContainer words={this.props.worksheet.get("words")} />
        }
    
        return <FillgapContainer />
    }

    render() {
        return (
            this.props.worksheet ?
            <Game {...this.props} children={this.getMode()} /> : null
        )
    }
}

GameContainer.propTypes = {
    mode: React.PropTypes.number.isRequired,
    worksheet: React.PropTypes.object,
    answer: React.PropTypes.array
}

const mapStateToProps = ({appReducer, gameReducer}) => ({
    worksheet: appReducer.get("worksheet"),
    mode: gameReducer.get("mode"),
    answer: gameReducer.get("answer")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeMode: (e) => dispatch(updateMode(parseInt(e.target.dataset.mode, 3))),
    getWorksheet: (id) => dispatch(fetchWorksheet(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
