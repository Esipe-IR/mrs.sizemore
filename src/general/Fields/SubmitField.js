import React from 'react'

const SubmitField = (props) => (
    <div className="form-group">
        <div className="col-sm-12">
            <button type="submit" className="btn btn-app" onClick={props.onClick}>{props.Value}</button>
        </div>
    </div>
)

export default SubmitField
