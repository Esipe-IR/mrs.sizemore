import React from 'react'

const Modal = () => (
    <Modal show={props.modal.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.modal.body}
        </Modal.Body>

        <Modal.Footer>
            <button onClick={props.onHide} className="btn btn-default">Close</button>
        </Modal.Footer>
    </Modal>
)

export default Modal
