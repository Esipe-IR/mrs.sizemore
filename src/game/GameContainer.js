import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Game from './component/Game'
import { fetchWorksheet } from '../firebase/duck'

class GameContainer extends React.Component {
    componentDidMount() {
        if (!this.props.worksheet || this.props.worksheet.get("id") !== this.props.params.id) {
            this.props.fetchWorksheet(this.props.params.id)
        }
    }

    render() {
        return this.props.worksheet && this.props.worksheet.get("id") === this.props.params.id ? 
        <Game {...this.props} /> : null
    }
}

GameContainer.propTypes = {
    worksheet: PropTypes.object
}

const mapStateToProps = ({ firebase, game }) => ({
    worksheet: firebase.get("worksheet")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchWorksheet: (id) => dispatch(fetchWorksheet(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
