import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { updateAction, updateUser, register, connexion } from './duck'
import { updateLoading } from '../app/duck'
import { editKey } from '../services/obj'

class AccountContainer extends React.Component {
    componentDidMount() {
        this.props.updateLoading(false)
    }

    onSubmit(e) {
        e.preventDefault()

        if (!this.props.action) this.props.register(this.props.user)
        else this.props.connexion(this.props.user)
    }

    onChange(e) {
        let newUser = editKey([e.target.id], e.target.value, this.props.user)
        this.props.updateUser(newUser)
    }

    updateAction() {
        this.props.updateAction(!this.props.action)
    }

    render() {
        return <Account {...this.props} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)} updateAction={this.updateAction.bind(this)} />
    }
}

AccountContainer.propTypes = {
    action: React.PropTypes.bool,
    user: React.PropTypes.object,
    error: React.PropTypes.bool,
}

const mapStateToProps = ({accountReducer, appReducer}) => ({
    action: accountReducer.get("action"),
    user: accountReducer.get("user"),
    error: accountReducer.get("error"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLoading: (loading) => dispatch(updateLoading(loading)),
    register: (user) => dispatch(register(user)),
    connexion: (user) => dispatch(connexion(user)),
    updateUser: (user) => dispatch(updateUser(user)),
    updateAction: (action) => dispatch(updateAction(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
