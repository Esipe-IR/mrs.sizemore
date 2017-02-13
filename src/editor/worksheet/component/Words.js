import React from 'react'
import { Field } from 'redux-form'

const Words = ({ fields, meta: { touched, error }, worksheetid, addDelete }) => (
    <ul className="list-group">
        {fields.map((member, index) =>
            <li key={index} className="list-group-item">
                <Field
                    name={`${member}.en`}
                    type="text"
                    component="input"/>

                {fields.get(index).id ? 
                    <a href={"/editor/word/" + fields.get(index).id} className="btn btn-primary margin-lft-5">
                        Edit
                    </a>
                    : 
                    null 
                }

                <button title="Remove" onClick={(e) => {e.preventDefault();addDelete(fields.get(index).id);fields.remove(index)}} className="btn btn-danger margin-lft-5">
                    Delete
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
