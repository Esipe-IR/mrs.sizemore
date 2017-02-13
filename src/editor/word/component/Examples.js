import React from 'react'
import { Field } from 'redux-form'

const Examples = ({ fields, meta: { touched, error } }) => (
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
        </li>

        {touched && error && <li className="list-group-item">{error}</li>}
    </ul>
)

export default Examples
