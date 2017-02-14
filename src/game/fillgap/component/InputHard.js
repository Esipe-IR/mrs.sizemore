import React from 'react'

const InputHard = (props) => (
    <input type="text"
        className="form-control"
        data-index={props.itemKey}
        onChange={props.onChange}
        value={props.userWord ? props.userWord.get("value") : ''}
        placeholder="english word" />
)

export default InputHard