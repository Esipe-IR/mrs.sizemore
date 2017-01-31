import React from 'react'
import { connect } from 'react-redux'
import Account from './component/Account'
import { editField, editAction, register, connexion } from './duck'
import { updateLoading } from '../app/duck'

class AccountContainer extends React.Component {
    componentDidMount() {
        this.props.updateLoading()
    }

    render() {
        return <Account {...this.props} />
    }
}

const mapStateToProps = ({accountReducer}) => ({
    action: accountReducer.action,
    user: accountReducer.user,
    error: accountReducer.error,
    errorMsg: accountReducer.errorMsg
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLoading: () => dispatch(updateLoading(false)),
    updateAction: (action) => () => dispatch(editAction(!action)),
    onChange: (e) => dispatch(editField(e.target.id, e.target.value, this.props.user)),
    onSubmit: (e) => {
        e.preventDefault()

        if (!this.props.action) {
            dispatch(register(this.props.user))
        } else {
            dispatch(connexion(this.props.user))            
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
