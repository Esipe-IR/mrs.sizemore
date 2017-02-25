import React from 'react'
import { connect } from 'react-redux'
import UPEM from './component/UPEM'
import { connexionUPEM } from '../firebase/duck'

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
    connexion: (user) => dispatch(connexionUPEM(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UPEMContainer)
