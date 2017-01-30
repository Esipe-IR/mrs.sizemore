import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { editField, editAction, register, connexion } from './duck'
import { loadingState } from '../app/duck'

class AccountContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.editAction = this.editAction.bind(this)
        this.props.dispatch(loadingState(false))
    }

    onSubmit(e) {
        e.preventDefault()

        if (!this.props.action) {
            return this.props.dispatch(register(this.props.user))
        }

        return this.props.dispatch(connexion(this.props.user))
    }

    onChange(e) {
        let id = e.target.id
        let value = e.target.value

        this.props.dispatch(editField(id, value, this.props.user))
    }

    editAction(e) {
        e.preventDefault()
        this.props.dispatch(editAction(!this.props.action))
    }

    render() {
        return <Account
                action={this.props.action}
                user={this.props.user}
                error={this.props.error}
                errorMsg={this.props.errorMsg}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                editAction={this.editAction} />
    }
}

function mapStateToProps(state) {
    const { accountReducer } = state

    return {
        action: accountReducer.action,
        user: accountReducer.user,
        error: accountReducer.error,
        errorMsg: accountReducer.errorMsg
    }
}

export default connect(mapStateToProps)(AccountContainer)
