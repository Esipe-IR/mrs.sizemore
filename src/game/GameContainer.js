import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet } from '../firebase/duck'
import { updateMode } from './duck'

class GameContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheet || this.props.worksheet.get("id") !== this.props.params.id) {
            this.props.fetchWorksheet(this.props.params.id)
        }
    }

    render() {
        return this.props.worksheet ? <Game {...this.props} /> : null
    }
}

GameContainer.propTypes = {
    worksheet: PropTypes.object,
    mode: PropTypes.number.isRequired
}

const mapStateToProps = ({ firebase, game }) => ({
    worksheet: firebase.get("worksheet"),
    mode: game.get("mode")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id)),
    updateMode: (mode) => dispatch(updateMode(mode))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
