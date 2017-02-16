import React from 'react'

const InputMedium = (props) => (
    <div className="input-group">
        <select data-index={props.itemKey} className="form-control" onChange={props.onChange} defaultValue="">
            <option>---</option>

            {props.userWords.map((w, i) => (
                <option key={w.get("en")}>{w.get("en")}</option>
            ))}
        </select>

        <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={() => props.onClickHelp(props.itemKey)}>
                <i className="fa fa-info-circle"></i>
            </button>
        </span>
    </div>
)

export default InputMedium
