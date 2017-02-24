import React from 'react'
import { connect } from 'react-redux'
import Game from './component/Game'
import { updateLoading } from '../app/duck'
import { fetchWorksheet } from '../firebase/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheet) this.props.fetchWorksheet(this.props.params.id)
        else this.props.updateLoading(false)
    }

    render() {
        console.log(this.props.worksheet)
        return this.props.worksheet ? <Game {...this.props} /> : null
    }
}

GameContainer.propTypes = {
    worksheet: React.PropTypes.object,
    mode: React.PropTypes.number.isRequired
}

const mapStateToProps = ({ firebase, game }) => ({
    worksheet: firebase.get("worksheet"),
    mode: game.get("mode")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id)),
    updateMode: (mode) => dispatch(updateMode(mode)),
    updateLoading: (status) => dispatch(updateLoading(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
