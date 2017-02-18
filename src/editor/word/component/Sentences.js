import React from 'react'
import { Field } from 'redux-form'

const Sentences = (props) => (
    <ul className="list-group">
        {props.fields.map((sentence, index) =>
            <li key={index} className="list-group-item">
                <Field
                    className="margin-btm-5 form-control"
                    rows={3}
                    name={`${sentence}`}
                    type="text"
                    component="textarea"
                    placeholder="Your sentence"/>

                <button type="button" title="Remove" onClick={() => props.fields.remove(index)} className="btn btn-danger">
                    <i className="fa fa-times" aria-hidden="true"></i> Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => props.fields.push("")} className="btn btn-primary margin-btm-5">
                <i className="fa fa-plus" aria-hidden="true"></i> Add sentence
            </button>

            <button type="button" onClick={() => props.fetchSentences(props.mutable_en)} className="btn btn-success margin-lft-5 margin-btm-5">
                <i className="fa fa-question-circle" aria-hidden="true"></i> Examples
            </button>
        </li>

        {props.meta.touched && props.meta.error && <li className="list-group-item">{props.meta.error}</li>}
    </ul>
)

export default Sentences
