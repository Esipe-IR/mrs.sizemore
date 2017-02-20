import React from 'react'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet } from '../app/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheet) this.props.fetchWorksheet(this.props.params.id)
    }

    render() {
        return this.props.worksheet ? <Game {...this.props} /> : null
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id)),
    updateMode: (mode) => dispatch(updateMode(mode))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
