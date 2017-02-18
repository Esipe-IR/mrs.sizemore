import React from 'react'

const Form = (props) => (
    <form className="form-horizontal" onSubmit={props.checkResult}>
        <div className="form-group">
            <input type="text" 
            className="form-control" 
            id="translate-french-value" 
            value={props.word.get("fr")} 
            disabled />
        </div>

        <div className={"form-group"}>
            <input type="text" 
            className="form-control" 
            name="translate-english-value" 
            id="translate-english-value" 
            value={props.input}
            onChange={props.formatInput}
            placeholder="English"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off" />
        </div>

        <hr />

        <div className="form-group">
            <div className="col-sm-12 text-center">
                <input className="btn btn-app" type="submit" value="Submit" />
            </div>
        </div>
    </form>
)

export default Form
