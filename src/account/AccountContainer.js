import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { updateAction, updateUser, register, connexion } from './duck'
import { updateLoading } from '../app/duck'
import { editKey } from '../services/obj'

class AccountContainer extends React.Component {
    componentDidMount() {
        this.props.updateLoading()
    }

    render() {
        return <Account {...this.props} />
    }
}

const mapStateToProps = ({accountReducer, appReducer}) => ({
    action: accountReducer.get("action"),
    user: accountReducer.get("user"),
    error: appReducer.get("error")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLoading: () => dispatch(updateLoading(false)),
    updateAction: (action) => () => dispatch(updateAction(!action)),
    onChange: (user) => (e) => {
        let newUser = editKey([e.target.id], e.target.value, user)
        dispatch(updateUser(newUser))
    },
    onSubmit: (action, user) => (e) => {
        e.preventDefault()
        if (!action) dispatch(register(user))
        else dispatch(connexion(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
