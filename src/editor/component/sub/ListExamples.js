import React from 'react'

const ListExamples = (props) => (
    <div className="list-group">
        {props.examples.map((e, i) => (
            <div key={"word/examples/" + i} className="list-group-item">
                <div className="input-group">
                    <input
                        id={"word/examples/" + i}
                        type="text" 
                        className="form-control"
                        placeholder="Examples" 
                        value={e}
                        onChange={props.editChild} 
                    />

                    <span className="input-group-btn">
                        <button data-child={"word/examples/" + i} className="btn btn-danger" onClick={props.deleteChild}>X</button>
                    </span>
                </div>
            </div>
        ))}
    </div>
)

export default ListExamples
