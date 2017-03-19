import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { updateAction, connectUPEM } from './duck'
import { updateLoading } from '../app/duck'
import { register, connexion } from '../firebase/duck'

class AccountContainer extends React.Component {
    componentDidMount() {
        this.props.updateLoading(false)
    }

    onSubmit(values) {
        if (!this.props.action) this.props.register(values)
        else this.props.connexion(values)
    }

    updateAction() {
        this.props.updateAction(!this.props.action)
    }

    render() {
        return <Account {...this.props} 
        onSubmit={this.onSubmit.bind(this)} 
        updateAction={this.updateAction.bind(this)} />
    }
}

AccountContainer.propTypes = {
    action: React.PropTypes.bool,
    errorBool: React.PropTypes.bool
}

const mapStateToProps = ({ account }) => ({
    action: account.get("action"),
    errorBool: account.get("error")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLoading: (loading) => dispatch(updateLoading(loading)),
    register: (user) => dispatch(register(user)),
    connexion: (user) => dispatch(connexion(user)),
    updateAction: (action) => dispatch(updateAction(action)),
    connectUPEM: () => dispatch(connectUPEM())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
