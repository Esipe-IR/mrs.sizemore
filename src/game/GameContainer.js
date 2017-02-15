import React from 'react'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet } from '../app/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchWorksheet(this.props.params.id))
    }

    updateMode(e) {
        let mode = parseInt(e.target.value, 10)
        this.props.dispatch(updateMode(mode))
    }

    render() {
        return this.props.worksheet ? <Game {...this.props} updateMode={this.updateMode.bind(this)} /> : null
    }
}

GameContainer.propTypes = {
    worksheet: React.PropTypes.object,
    mode: React.PropTypes.number.isRequired
}

const mapStateToProps = ({ appReducer, gameReducer }) => ({
    worksheet: appReducer.get("worksheet"),
    mode: gameReducer.get("mode")
})

export default connect(mapStateToProps)(GameContainer)
