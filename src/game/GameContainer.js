import React from 'react'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet } from '../app/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.updateMode = this.updateMode.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchWorksheet(this.props.params.id))
    }

    updateMode(e) {
        let mode = parseInt(e.target.dataset.mode, 3)
        this.props.dispatch(updateMode(mode))
    }

    render() {
        return this.props.worksheet ? <Game {...this.props} updateMode={this.updateMode} /> : null
    }
}

GameContainer.propTypes = {
    mode: React.PropTypes.number.isRequired,
    worksheet: React.PropTypes.object
}

const mapStateToProps = ({ appReducer, gameReducer }) => ({
    worksheet: appReducer.get("worksheet"),
    mode: gameReducer.get("mode")
})

export default connect(mapStateToProps)(GameContainer)
