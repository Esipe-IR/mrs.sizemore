import React from 'react'

const InputMedium = (props) => (
    <div className="input-group">
        <input type="text" 
            className="form-control" 
            data-index={props.itemKey} 
            onChange={props.onChange} 
            value={props.userWord ? props.userWord.get("value") : ''}
            placeholder="english word"
            readOnly={true}/>

        <span className="input-group-btn">
            <button className="btn btn-default" onClick={(e) => {e.preventDefault(); return props.onClick(props.itemKey)}}>
                <i className="fa fa-info-circle"></i>
            </button>
        
            <select data-index={props.itemKey} className="btn btn-default" onChange={props.onChange} defaultValue="">
                <option></option>

                {props.words.map((w, i) => (
                    <option key={w.get("en")}>{w.get("en")}</option>
                ))}
            </select>
        </span>
    </div>
)

export default InputMedium
