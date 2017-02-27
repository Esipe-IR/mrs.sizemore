import React from 'react'
import { connect } from 'react-redux'
import UPEM from './component/UPEM'
import { connexion } from './duck'

class UPEMContainer extends React.Component {
    onSubmit(values) {
        return this.props.connexion(values)
    }

    render() {
        return <UPEM {...this.props} onSubmit={this.onSubmit.bind(this)} />
    }
}

UPEMContainer.propTypes = {}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
    connexion: (user) => dispatch(connexion(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UPEMContainer)
