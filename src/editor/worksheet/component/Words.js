import React from 'react'
import { Field } from 'redux-form'

const Words = ({ fields, meta: { touched, error }, worksheetid, addDelete }) => (
    <ul className="list-group">
        {fields.map((member, index) =>
            <li key={index} className="list-group-item">
                <Field
                    className="margin-btm-5"
                    name={`${member}.en`}
                    type="text"
                    component="input"
                    placeholder="English"/>

                {fields.get(index).id ? 
                    <a href={"/edit/word/" + fields.get(index).id} className="btn btn-primary margin-lft-5 margin-btm-5">
                        <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                    </a>
                    : 
                    null 
                }

                <button title="Remove" type="button" onClick={() => {
                        addDelete(fields.get(index).id)
                        fields.remove(index)
                }} className="btn btn-danger margin-lft-5 margin-btm-5">
                    <i className="fa fa-times" aria-hidden="true"></i> Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => fields.push({worksheet: worksheetid})} className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true"></i> Add word
            </button>
        </li>

        {touched && error && <li className="list-group-item">{error}</li>}
    </ul>
)

export default Words
