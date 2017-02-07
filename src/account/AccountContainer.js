import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { updateAction, updateUser, register, connexion } from './duck'
import { updateLoading } from '../app/duck'
import { editKey } from '../services/obj'

class AccountContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.updateAction = this.updateAction.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(updateLoading(false))
    }

    onSubmit(e) {
        e.preventDefault()

        if (!this.props.action) this.props.dispatch(register(this.props.user))
        else this.props.dispatch(connexion(this.props.user))
    }

    onChange(e) {
        let newUser = editKey([e.target.id], e.target.value, this.props.user)
        this.props.dispatch(updateUser(newUser))
    }

    updateAction() {
        this.props.dispatch(updateAction(!this.props.action))
    }

    render() {
        return <Account {...this.props} onSubmit={this.onSubmit} onChange={this.onChange} updateAction={this.updateAction} />
    }
}

AccountContainer.propTypes = {
    action: React.PropTypes.number,
    user: React.PropTypes.object,
    error: React.PropTypes.bool
}

const mapStateToProps = ({accountReducer, appReducer}) => ({
    action: accountReducer.get("action"),
    user: accountReducer.get("user"),
    error: appReducer.get("error")
})

export default connect(mapStateToProps)(AccountContainer)
