import React from 'react'
import { Field } from 'redux-form'

const Examples = ({ fields, meta: { touched, error }, clickExample }) => (
    <ul className="list-group">
        {fields.map((member, index) =>
            <li key={index} className="list-group-item">
                <Field
                    name={`${member}`}
                    type="text"
                    component="input"/>

                <button title="Remove" onClick={() => fields.remove(index)} className="btn btn-danger">
                    Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => fields.push("")} className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true"></i> Add example
            </button>

            <button type="button" onClick={clickExample} className="btn btn-success margin-lft-5">
                <i className="fa fa-question-circle" aria-hidden="true"></i> Help
            </button>
        </li>

        {touched && error && <li className="list-group-item">{error}</li>}
    </ul>
)

export default Examples
