import React from 'react'

const InputHard = (props) => (
    <input type="text"
        className="form-control"
        data-index={props.itemKey}
        onChange={props.onChange}
        value={props.userWords.get(props.itemKey).get("value")}
        placeholder="english word"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"  />
)

export default InputHard