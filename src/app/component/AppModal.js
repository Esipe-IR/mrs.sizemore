import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { updateModal } from '../duck'

class AppModal extends React.Component {
    onHide() {
        this.props.dispatch(updateModal(false))
    }

    render() {
        return (
            <Modal show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.content}
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={this.onHide.bind(this)} className="btn btn-default">Close</button>
                    {this.props.action}
                </Modal.Footer>
            </Modal>
        )
    }
}

AppModal.propTypes = {
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    show: React.PropTypes.bool
}

const mapStateToProps = ({ appReducer }) => ({
    show: appReducer.get("modal")
})

export default connect(mapStateToProps)(AppModal)
