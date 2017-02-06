import React from 'react'
import { Modal } from 'react-bootstrap'

const AppModal = (props) => (
    <Modal {...props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.content}
        </Modal.Body>

        <Modal.Footer>
            <button onClick={props.onHide} className="btn btn-default">Close</button>
            {props.action}
        </Modal.Footer>
    </Modal>
)

export default AppModal
