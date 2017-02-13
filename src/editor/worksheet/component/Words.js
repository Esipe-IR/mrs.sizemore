import React from 'react'

const Words = ({ fields, meta: { touched, error }, initialValues }) => (
    <ul className="list-group">
        {fields.map((member, index) =>
            <li key={index} className="list-group-item">
                {initialValues.words[index].en}

                <a href={"/editor/word/" + member.id} className="btn btn-primary margin-lft-5">
                    Edit
                </a> 

                <button title="Remove" onClick={() => fields.remove(index)} className="btn btn-danger margin-lft-5">
                    Delete
                </button>
            </li>
        )}

        <li className="list-group-item">
            <button type="button" onClick={() => fields.push("")} className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true"></i> Add word
            </button>

            {touched && error && <span>{error}</span>}
        </li>
    </ul>
)

export default Words
