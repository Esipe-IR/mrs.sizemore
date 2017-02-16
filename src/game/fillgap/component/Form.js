import React from 'react'
import reactStringReplace from 'react-string-replace'
import InputMedium from './InputMedium'
import InputHard from './InputHard'

const getClass = (status) => {
    if (status === true) return "has-success"
    if (status === false) return "has-error"
}

const Form = (props) => (
    <form onSubmit={props.onSubmit}>
        <p>Count: {props.count}/{props.userWords.size}</p>
        <div className="margin-btm-20">
            <b>{props.difficulty === 0 ? "Choose" : "Write"} the right word in the sentence.</b>
        </div>

         {props.userWords.map((w, index) => (
            <div key={w.get("id")} className={"form-group " + getClass(w.get("status")) }>
                {reactStringReplace(w.get("example"), '[x]', (match, i) => (
                    <div key={index}>
                        {props.difficulty === 0 ?
                            <InputMedium {...props} itemKey={index} />
                                :
                            <InputHard {...props} itemKey={index} />
                        }
                    </div>
                ))}.
            </div>
        ))}

        <hr />

        <input className="btn btn-app" type="submit" value="Submit" />
    </form>
)

export default Form
