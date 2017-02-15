import React from 'react'
import { Field } from 'redux-form'

const Examples = (props) => (
    <ul className="list-group">
        {props.fields.map((member, index) =>
            <li key={index} className="list-group-item">
                <Field
                    name={`${member}`}
                    type="text"
                    component="input"/>

                <button title="Remove" onClick={() => props.fields.remove(index)} className="btn btn-danger">
                    Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => props.fields.push("")} className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true"></i> Add example
            </button>

            <button type="button" onClick={() => props.fetchExamples()} className="btn btn-success margin-lft-5">
                <i className="fa fa-question-circle" aria-hidden="true"></i> Help
            </button>
        </li>

        {props.meta.touched && props.meta.error && <li className="list-group-item">{props.meta.error}</li>}
    </ul>
)

export default Examples
